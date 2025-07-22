import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>
                    {(() => {
                        if (typeof error === 'object' && error !== null) {
                            const statusText = (error as { statusText?: string }).statusText;
                            const message = (error as { message?: string }).message;
                            return statusText || message || 'Unknown error';
                        }
                        return String(error);
                    })()}
                </i>
            </p>
        </div>
    );
}
