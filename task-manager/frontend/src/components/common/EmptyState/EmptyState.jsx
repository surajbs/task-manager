import "./EmptyState.css";

function EmptyState({

    title = "Nothing Here",

    description = "There is no data available."

}) {

    return (

        <div className="empty-state">

            <div className="empty-icon">

                📋

            </div>

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

        </div>

    );

}

export default EmptyState;