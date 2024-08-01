import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const BookCards = ({ headline, books }) => {
    // Function to handle clicking on book image or details
    const handleViewPDF = (pdfURL) => {
        window.location.href = pdfURL;
    };

    return (
        <div className='my-16 px-4 lg:px-24'>
            <h2 className='text-5xl my-5 font-bold text-center'>{headline}</h2>

            {/* cards */}
            <div className='mt-20'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className=" w-full h-full"
                >
                    {books.map(book => (
                        <SwiperSlide className='text-center flex items-center justify-center' key={book._id}>
                            {/* Wrap the content in a link to navigate to the book's details page */}
                            <Link to={`/book/${book._id}`} className='cursor-pointer'>
                                <div className='bg-gray-100 p-8 rounded-lg relative'>
                                    {/* Add onClick event handler to the image to navigate to the PDF */}
                                    <img src={book.imageURL} alt="" className='w-full' onClick={() => handleViewPDF(book.bookPDFURL)} />
                                </div>

                                <div className='mt-5 mb-8 text-left space-y-2 flex justify-between items-start'>
                                    <div>
                                        <h3 className='text-black font-semibold'>{book.bookTitle}</h3>
                                        <p>{book.authorName}</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default BookCards;
