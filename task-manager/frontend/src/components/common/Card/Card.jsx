import "./Card.css";

function Card({

    children,

    title,

    subtitle,

    hover = true,

    className = ""

}) {

    return (

        <div

            className={`

                card

                ${hover ? "card-hover" : ""}

                ${className}

            `}

        >

            {title && (

                <div className="card-header">

                    <h3>{title}</h3>

                    {subtitle && (

                        <p>{subtitle}</p>

                    )}

                </div>

            )}

            <div className="card-body">

                {children}

            </div>

        </div>

    );

}

export default Card;