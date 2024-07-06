import { Book } from "../types";

interface ResultCardsProps {
  book: Book
}

const ResultCards:React.FC<ResultCardsProps> = ({book}) => {
  const {title, author_name, first_publish_year, want_to_read_count, currently_reading_count, already_read_count} = book
  return (
    <article  className="w-full rounded-md border border-gray-300 p-2 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-75 ease-in-out">
      <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      <ul>
        <p className="mt-2 font-light text-sm sm:text-md text-gray-600">{author_name}</p>
      </ul>
      <aside className="mt-4">
        <ul className="flex flex-wrap gap-4 items-center">
          <li className="text-xs sm:text-sm text-gray-700">Reading: {currently_reading_count}</li>
          <li className="text-xs sm:text-sm text-gray-700">Plan to Read: {want_to_read_count}</li>
          <li className="text-xs sm:text-sm text-gray-700">Already Read: {already_read_count}</li>
          <li className="ml-auto bg-PRIMARY_BG sm:p-1 rounded-sm text-white text-xs sm:text-sm">Published in: {first_publish_year}</li>
        </ul>
      </aside>
    </article>
  );
}

export default ResultCards;
