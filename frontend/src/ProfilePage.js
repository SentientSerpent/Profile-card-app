// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/profile/${id}`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, [id]);

  if (!profile) return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>{profile.name}</h2>
        <p><strong>🌈 Strengths:</strong> {profile.strengths.join(', ')}</p>
        <p><strong>⚡ Weaknesses:</strong> {profile.weaknesses.join(', ')}</p>
        <p><strong>🎯 Overall Fit:</strong> {profile.overall_fit}</p>
        <Link to="/" style={styles.link}>🔁 Create Another</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    minHeight: '100vh',
    paddingTop: '60px',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#fff'
  },
  card: {
    margin: 'auto',
    padding: '25px',
    width: '350px',
    borderRadius: '15px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    color: '#333',
    textAlign: 'left'
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#222'
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    color: '#0072ff',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default ProfilePage;
