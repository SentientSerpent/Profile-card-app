// FormPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    strengths: '',
    weaknesses: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      strengths: formData.strengths.split(',').map(s => s.trim()),
      weaknesses: formData.weaknesses.split(',').map(w => w.trim())
    };

    const res = await fetch('https://profile-card-app-uc1i.onrender.com/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    navigate(`/profile/${data.user_id}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🌟 Create Your Profile 🌟</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="strengths"
          placeholder="Strengths (comma-separated)"
          value={formData.strengths}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="weaknesses"
          placeholder="Weaknesses (comma-separated)"
          value={formData.weaknesses}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>🚀 Generate</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #fc466b, #3f5efb)',
    minHeight: '100vh',
    color: '#fff'
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    gap: '15px',
    padding: '25px',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(8px)'
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.85)',
    color: '#333'
  },
  button: {
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default FormPage;
