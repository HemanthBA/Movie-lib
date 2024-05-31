import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../App.css';
import ListOfMovie from './ListOfMovie';
import MovieHeading from './MovieHeading';
import SearchMovie from './SearchMovie';
import Add_To_Playlist from './Add_To_Playlist';
import RemoveFromPlaylist from './RemoveFromPlaylist';

const Main_Logic = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchKey, setSearchValue] = useState('');
	const [isPublicView, setIsPublicView] = useState(true); // State to manage public/private view
	const [pin, setPin] = useState(''); // State to manage PIN input
	const [accessGranted, setAccessGranted] = useState(false); // State to manage access to private playlist

	const getMovieRequest = async (searchKey) => {
		const url = `http://www.omdbapi.com/?s=${searchKey}&apikey=2518a455`;
		
		const response = await fetch(url);
		const responseJson = await response.json();
       
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchKey);
	}, [searchKey]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, { ...movie, isPublic: isPublicView }];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const handleToggleView = (isPublic) => {
		setIsPublicView(isPublic);
		if (isPublic) {
			setAccessGranted(true); // Automatically grant access to public view
		} else {
			setAccessGranted(false); // Reset access for private view
			setPin(''); // Clear PIN input
		}
	};

	const handlePinChange = (e) => {
		setPin(e.target.value);
	};

	const handlePinSubmit = () => {
		if (pin === '3215') {
			setAccessGranted(true);
		} else {
			alert('Incorrect PIN');
			setPin('');
		}
	};

	const filteredFavourites = favourites.filter(movie => movie.isPublic === isPublicView);

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieHeading heading='List Of Movies' />
				<SearchMovie searchKey={searchKey} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<ListOfMovie
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={Add_To_Playlist}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieHeading heading='Created Playlist' />
				<div className='col'>
					<button
						className={`btn ${isPublicView ? 'btn-primary' : 'btn-outline-primary'} mr-2`}
						onClick={() => handleToggleView(true)}
					>
						Public
					</button>
					<button
						className={`btn ${!isPublicView ? 'btn-primary' : 'btn-outline-primary'}`}
						onClick={() => handleToggleView(false)}
					>
						Private
					</button>
				</div>
			</div>
			{!isPublicView && !accessGranted && (
				<div className='row'>
					<div className='col'>
						<h1 style={{fontSize:18, fontweight:"bold"}}>Only Admin can Access</h1>
						
						<input
							type='password'
							placeholder='Enter PIN'
							value={pin}
							onChange={handlePinChange}
							className='form-control'
						/>
						<button onClick={handlePinSubmit} className='btn btn-primary mt-2'>
							Submit
						</button>
					</div>
				</div>
			)}
			<div className='row'>
				{(isPublicView || accessGranted) && (
					<ListOfMovie
						movies={filteredFavourites}
						handleFavouritesClick={removeFavouriteMovie}
						favouriteComponent={RemoveFromPlaylist}
					/>
				)}
			</div>
		</div>
	);
};

export default Main_Logic;
