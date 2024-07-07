import { Book } from "../types";

interface ResultCardsProps {
  book: Book
}

const ResultCards:React.FC<ResultCardsProps> = ({book}) => {
  const {title, author_name, first_publish_year, want_to_read_count, currently_reading_count, already_read_count} = book
  return (
    <article  className="w-full rounded-md border border-gray-300 p-2 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-75 ease-in-out" aria-label="book detail card">
      <h1 className="text-xl sm:text-2xl font-bold" aria-label="book title">{title}</h1>
      <ul>
        <p className="mt-2 font-light text-sm sm:text-md text-gray-600" aria-label="book author name">{author_name}</p>
      </ul>
      <aside className="mt-4">
        <ul className="flex flex-wrap gap-4 items-center">
          <li className="text-xs sm:text-sm text-gray-700" aria-label="currently reading the book">Reading: {currently_reading_count || "NiL"}</li>
          <li className="text-xs sm:text-sm text-gray-700" aria-label="Planing to the book">Plan to Read: {want_to_read_count || "NiL"}</li>
          <li className="text-xs sm:text-sm text-gray-700" aria-label="Already read the book">Already Read: {already_read_count || "NiL"}</li>
          <li className="ml-auto bg-PRIMARY_BG sm:p-1 rounded-sm text-white text-xs sm:text-sm">Published in: {first_publish_year}</li>
        </ul>
      </aside>
    </article>
  );
}

export default ResultCards;
