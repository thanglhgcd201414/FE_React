import { useRouteError } from 'react-router-dom';
import { Button } from 'antd';

interface IError {
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as IError;
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="mt-2 text-md text-gray-500">
          <i>{error?.statusText || error?.message}</i>
        </p>
        <div className="mt-6">
          <Button type="primary" onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </div>
      </div>
    </div>
  );
}
