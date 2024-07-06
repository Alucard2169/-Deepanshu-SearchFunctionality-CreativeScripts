import React from 'react';
import { Book } from "../types";

interface ResultCardsProps {
  book: Book;
}

const ResultCards: React.FC<ResultCardsProps> = ({ book }) => {
  return (
    <article key={book.key} className="rounded-md border border-gray-300 p-4 shadow-sm hover:shadow-md transition-shadow duration-75 ease-in-out">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <ul>
        <p className="mt-2 font-light text-md text-gray-600">{book.author_name.join(', ')}</p>
      </ul>
      <aside className="mt-4">
        <ul className="flex flex-wrap gap-4 items-center">
          <li className="text-sm text-gray-700">Reading: {book.currently_reading_count}</li>
          <li className="text-sm text-gray-700">Plan to Read: {book.want_to_read_count}</li>
          <li className="text-sm text-gray-700">Already Read: {book.already_read_count}</li>
          <li className="ml-auto bg-PRIMARY_BG p-1 rounded-sm text-white text-sm">Published in: {book.first_publish_year}</li>
        </ul>
      </aside>
    </article>
  );
}

export default ResultCards;
