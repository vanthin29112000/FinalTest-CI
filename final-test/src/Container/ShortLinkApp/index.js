import React, { Component } from "react";
import Loading from "../../Component/Loading";
import fetchAPIShortLink from "../../Service";
import ResultShortLink from "../ResultShortLink";
import "./ShortLinkApp.css";
class ShortLinkApp extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isShowLoading: false,
         btn_selection: {
            1: false,
            2: false,
            3: false,
         },
         selected: 0,
         url: "",
         linkShort: "",
         link: "",
      };
   }

   onChangeSelection = (selection) => {
      let btn_selection_default = {
         1: false,
         2: false,
         3: false,
      };
      btn_selection_default[selection] = true;
      this.setState({
         btn_selection: btn_selection_default,
         selected: selection,
      });
   };

   onChangeURLLink = (e) => {
      const { value } = e.target;
      this.setState({
         url: value,
      });
   };

   onFetchAPIShotLink = async (e) => {
      e.preventDefault();
      try {
         this.setState({
            isShowLoading: true,
         });
         const response = await fetchAPIShortLink.shortLink(this.state.url);
         const data = response.data.result;
         switch (this.state.selected) {
            case 1: {
               this.setState({
                  linkShort: data.short_link,
                  link: data.full_short_link,
                  isShowLoading: false,
               });
               break;
            }
            case 2: {
               this.setState({
                  linkShort: data.short_link2,
                  link: data.full_short_link2,
                  isShowLoading: false,
               });
               break;
            }
            case 3: {
               this.setState({
                  linkShort: data.short_link3,
                  link: data.full_short_link3,
                  isShowLoading: false,
               });
               break;
            }
            default: {
               this.setState({
                  isShowLoading: false,
                  selected: -1,
               });
            }
         }
      } catch (error) {
         alert(error);
      }
   };

   render() {
      const { btn_selection, isShowLoading, linkShort, link, selected } =
         this.state;
      if (isShowLoading) {
         return <Loading></Loading>;
      }
      return (
         <>
            <div className="short-link">
               <p className="short-link__title">Link Shortener</p>
               <div className="short-link__input">
                  <form className="input" onSubmit={this.onFetchAPIShotLink}>
                     <p>Enter a link : </p>
                     <input
                        onChange={this.onChangeURLLink}
                        className="link-url"
                        placeholder="example.com"
                        required
                     ></input>
                     <button className="btn_submit" type="submit">
                        <i class="fas fa-arrow-right"></i>
                     </button>
                  </form>
                  <div className="selection">
                     <>Short domain : </>
                     {btn_selection[1] ? (
                        <p className="active">shrtco.de</p>
                     ) : (
                        <p
                           className="non-active"
                           onClick={() => this.onChangeSelection(1)}
                        >
                           shrtco.de
                        </p>
                     )}
                     {btn_selection[2] ? (
                        <p className="active">9pr.de</p>
                     ) : (
                        <p
                           className="non-active"
                           onClick={() => this.onChangeSelection(2)}
                        >
                           9pr.de
                        </p>
                     )}
                     {btn_selection[3] ? (
                        <p className="active">shiny.link</p>
                     ) : (
                        <p
                           className="non-active"
                           onClick={() => this.onChangeSelection(3)}
                        >
                           shiny.link
                        </p>
                     )}
                  </div>
                  {selected === -1 && (
                     <p className="warning">Please choose Short Domain!!</p>
                  )}
               </div>
            </div>
            {link && (
               <ResultShortLink
                  linkShort={linkShort}
                  link={link}
               ></ResultShortLink>
            )}
         </>
      );
   }
}
export default ShortLinkApp;
