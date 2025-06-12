import { useState } from 'react';
import { useUser } from '../context/UserContext';

function AdminLogin({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useUser();

    async function handleSubmit(e) {
        e.preventDefault();
        const baseURL = import.meta.env.VITE_API_URL;
        setError(null);
        setLoading(true);

        try {
            // Send login request, session cookie will be set by backend
            const response = await fetch(`${baseURL}/accounts/login/`, {
                method: 'POST',
                credentials: 'include', // important to send cookies
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // After successful login, fetch user info to update context
                await login();

                // Or you can fetch user info here directly as a shortcut:
                const meResponse = await fetch(`${baseURL}/accounts/me/`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                const userData = await meResponse.json();

                if (!userData.is_staff) {
                    setError('You must be an admin to log in here.');
                    setLoading(false);
                    return;
                }

                onLoginSuccess && onLoginSuccess();
            } else {
                const data = await response.json();
                setError(data.error || 'Login failed.');
            }
        } catch (err) {
            setError('Network error.');
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
            <h2>Admin Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
            </label>

            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
            </label>

            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default AdminLogin;
