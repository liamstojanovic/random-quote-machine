import { useEffect, useState } from 'react';

interface Quote {
    content: string,
    author: string
}

const Quotebox = () => {
    /**
     * State of Quotebox component is an instance of the Quote object
     */
    const [quote, setQuote] = useState<Quote>({
        content: "Loading...",
        author: "Loading..."
    });

    /**
     * When the application first loads, fetch a quote
     */
    useEffect(() => {
        const initialQuote = async () => await getRandomQuote();

        initialQuote()
        .then((result) => setQuote(result));

    }, [])

    /**
     * Leverages https://github.com/lukePeavey/quotable public API server to fetch a random quote
     * @returns A Quote object
     */
    const getRandomQuote = async (): Promise<Quote> => {
        try {
            const res = await fetch("https://api.quotable.io/random");
            const json = await res.json();

            return {
                content: json.content,
                author: json.author
            }
        } catch(e) {
            return {
                content: "Failed to fetch quote content.",
                author: "Failed to fetch quote author."
            }
        }
    }
    /**
     * Uses state to generate an href suitable for Tweeting the quote and author
     * @returns Twitter share href
     */
    const generateTwitterUrl = (): string => {
        // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
        const baseUrl: string = 'https://twitter.com/intent/tweet?text=';
        // Construct the quote and author string using state
        const quoteAndAuthor: string = `"${quote.content}" - ${quote.author}`;
        // Concatenate baseUrl and quoteAndAuthor to yield tweet URL
        const rawUrl: string = baseUrl.concat(quoteAndAuthor);

        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode to escape HTML characters
        const encodedQuote = document.createTextNode(rawUrl);
        // Override null safety check, as there will always be non-null values in state.
        return encodedQuote.textContent!;
    }

    return (
        <div id="wrapper" className="relative">
            <div id="quote-box" className="flex flex-col items-center h-screen w-screen justify-center">
                
                <div id="text" className="text-xl">
                    <i className="fa-sharp fa-solid fa-quote-left"></i>
                    {quote.content}
                    <i className="fa-sharp fa-solid fa-quote-right"></i>
                </div>
                

                <div id="author" className="text-lg italic">
                    {quote.author}
                </div>

                <button id="new-quote" title="New Quote" onClick={async () => setQuote(await getRandomQuote())}>
                    <i className="fa-solid fa-rotate-right"></i> New Quote
                </button>
                
                <p id="social">
                    <a id="tweet-quote" href={generateTwitterUrl()}>
                        <i className="fa-brands fa-square-twitter"></i>
                    </a>
                </p>
            </div>
        </div>

    )
}

export default Quotebox;