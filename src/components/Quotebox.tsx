import { useEffect, useState } from 'react';

interface Quote {
    content: string,
    author: string
}

const Quotebox = () => {

    const [quote, setQuote] = useState<Quote>({
        content: "Loading...",
        author: "Loading..."
    });

    useEffect(() => {
        const initialQuote = async () => await getRandomQuote();

        initialQuote()
        .then((result) => setQuote(result));

    }, [])
    
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

    return (
        <div id="quote-box">
            <div id="text">
                {quote.content}
            </div>

            <div id="author">
                <b>{quote.author}</b>
            </div>

            <button id="new-quote" onClick={async () => setQuote(await getRandomQuote())}>
                <i className="fa-solid fa-rotate-right"> New Quote</i>
            </button>
            
            <p id="social">
                <i className="fa-brands fa-square-twitter"></i>
            </p>
            
        </div>
    )
}

export default Quotebox;