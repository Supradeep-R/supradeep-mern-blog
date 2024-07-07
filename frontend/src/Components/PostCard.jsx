import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Card } from "flowbite-react";

const PostCard = ({
  _id,
  title,
  summary,
  imageURL,
  content,
  createdAt,
  author,
}) => {
  return (
    <div className="flex flex-col border rounded-lg shadow-md hover:shadow-lg  md:flex-row">
      <div id="image-div" className="h-48 md:mb-0 md:w-1/5 md:h-auto">
      <Link to={`/view-single-post/${_id}`}>
          <img
            src={imageURL}
            alt={title}
            className="h-full w-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
          />
        </Link>
      </div>
      <div id="text-div" className="p-4 md:w-2/3">
        <Link to={`/view-single-post/${_id}`}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {summary}
        </p>
        <p className="info mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="author font-medium">
            <Link to={`/view-author-posts/${author._id}`} className=" text-blue-500 hover:underline">@{author.username}</Link>
          </span>
          <span className="ml-2">{formatISO9075(new Date(createdAt))}</span>
        </p>
        <Link to={`/view-single-post/${_id}`} className="mt-4 inline-block">
          <Button>
            Read more
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
