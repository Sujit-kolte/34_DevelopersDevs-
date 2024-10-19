"use client";
import Link from "next/link";
const Card = ({
  Name,
  ContactNo,
  Email,
  isAvailable,
}: {
  Name: string;
  ContactNo: string;
  Email: string;
  isAvailable: boolean;
}) => {
  return (
    <div className="w-full p-4">
      <div className="w-full border-2 border-gray-100 bg-white shadow-md rounded-lg px-8 py-4 h-auto  flex justify-center items-start flex-col">
        <div className="text-3xl tracking-wide font-bold mb-2">{Name}</div>
        <div className="flex items-center text-gray-600 mb-2  mt-4 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5h18M9 5v14l4-4 4 4V5"
            />
          </svg>
          <span>{ContactNo}</span>
        </div>
        <div className="flex text-sm items-center text-gray-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12H3v8m13-8v8m8-8v8m0-8l-8-8-8 8"
            />
          </svg>
          <span>{Email}</span>
        </div>
        <Link
          href={`/pages/nurseinfo/${Email}`}
          className="flex text-sm items-center text-blue-500 cursor-pointer mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h8v6h-8v-6zM5 5h14M3 3h18m-7 0v10h10V3H7v10H2m5 0H2V3h2"
            />
          </svg>
          <span>View Profile</span>
        </Link>
        <div className="mt-4 self-end rounded-full border-2 border-green-500">
          <span
            className={`inline-block px-6 py-3  text-sm font-semibold text-green-800 bg-green-100 rounded-full ${
              isAvailable
                ? "text-green-800 bg-green-100"
                : "text-red-800 bg-red-100"
            }`}
          >
            {isAvailable ? "Available" : "Not Available"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Card;
