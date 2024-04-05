import React, { useState } from 'react';
import axios from 'axios';
import notfound from './404.gif';
import './UserSearch.css'

const UserSearch = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Kullanıcının girdiği arama sorgusunu tutması için
    const [user, setUser] = useState(null); // API'den gelen kullanıcı bilgilerini tutması için
    const [error, setError] = useState(''); // Hata durumunda kullanıcıya göstermek için
    const [showNotFound, setShowNotFound] = useState(false); // Not found gif'inin gösterilip gösterilmeyeceğini kontrol etmek için

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            return; // Input boşsa arama yapmayı engelle
        }

        try {
            const response = await axios.get(`https://api.github.com/users/${searchQuery}`);
            setUser(response.data);
            setError('');
            setShowNotFound(false); // Kullanıcı bulunduğunda not found gif'ini gizle
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('An error occurred while fetching the user.');
            setUser(null);
            setShowNotFound(true); // Kullanıcı bulunamadığında not found gif'ini göster
        }
    };

    const handleViewProfile = () => {
        window.open(`https://github.com/${user.login}`, '_blank');
    };

    return (
        <div className="user-search-container">
            <h1>Github User Search</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter a Github username"
            />
            <button disabled={searchQuery.trim() === ''} onClick={handleSearch}>Search</button>

            {error && <p className="error">{error}</p>}

            {user && (
                <div className="user-info">
                    <h2>{user.login}</h2>
                    <img src={user.avatar_url} alt={user.login} />
                    <button onClick={handleViewProfile}>View Profile</button>
                </div>
            )}
            {showNotFound && (
                <div className="not-found">
                    <img src={notfound} alt="" />
                    <p>User not Found</p>
                </div>
            )}
        </div>
    );
};

export default UserSearch;

