import React, { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(setBooks);
    fetch('http://localhost:5000/api/cart')
      .then(res => res.json())
      .then(setCart);
  }, []);

  const addToCart = (book) => {
    fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
      .then(res => res.json())
      .then(setCart);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Book Store</h1>
      <h2>Books</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {books.map(book => (
          <div key={book._id} style={{ border: '1px solid #ddd', padding: 12 }}>
            <img src={book.image} alt={book.title} width={100} /><br />
            <strong>{book.title}</strong><br />
            <em>{book.author}</em><br />
            <span>${book.price}</span><br />
            <button onClick={() => addToCart(book)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h2>Cart</h2>
      <ul>
        {cart.map((book, idx) => (
          <li key={idx}>{book.title} - ${book.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;