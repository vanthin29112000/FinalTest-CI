import React from "react";
import "./ResultShortLink.css";
const ResultShortLink = (props) => {
   const { linkShort, link } = props;
   return (
      <div className="result-short-link">
         <p className="result-short-link__title">Link generated!</p>
         <a href={link}>{linkShort}</a>
      </div>
   );
};
export default ResultShortLink;
