import React, { useContext, useEffect, useState } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthProvider';

export default function Shop() {
  const { loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  // Fetching data
  useEffect(() => {
    fetch('http://localhost:5000/books/')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, [loading]);

  // Loader
  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  // Function to handle "Read Now" button click
  const handleReadNow = (pdfURL) => {
    window.location.href = pdfURL;
  };

  return (
    <div className='my-28 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold text-center mb-16 z-40'>All Books Are Available Here</h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
        {books.map(book => (
          <Card key={book.id}>
            <img src={book.imageURL} alt="" className='h-96' />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.bookTitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Discover a curated collection of the latest eye health resources available for free, presented in reverse chronological order.
            </p>
            {/* Pass the PDF URL to the handleReadNow function */}
            <button className='px-4 py-2 bg-blue-600 text-white rounded' onClick={() => handleReadNow(book.bookPDFURL)}>Read Now</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
