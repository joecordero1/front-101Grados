import React from 'react';

function BannerOneSection () {
    return (
        <section className="newsletter-section mb-10 pb-7">
            <div className="container">
                <div className="banner banner-radius" style={ { backgroundImage: "url(images/home/banner/7.jpg)", backgroundColor: "#1c2225" } }>
                    <div className="banner-content">
                        <h4 className="banner-title text-white mt-0 mt-md-3 ls-m">Download Riode App Now!</h4>
                        <p className="text-white">Shopping fastly and easily more with our app. Get a link to download the app on your phone.</p>
                        <form action="#" method="get" className="input-wrapper input-wrapper-inline">
                            <input type="email" className="form-control" name="email" id="email2" placeholder="Enter Your Email..." required />
                            <button className="btn btn-primary" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo( BannerOneSection );