import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';

import SmallProduct from '~/components/features/product/product-sm';

import withApollo from '~/server/apollo';



import { scrollTopHandler } from '~/utils';
import { GET_VENDOR_SIDEBAR_DATA } from '~/server/queries';

function SidebarFilterOne ( props ) {
    const { type = "left", adClass = "col-lg-4 col-xl-3" } = props;
    const router = useRouter();
    const query = router.query;
    const { data, loading, error } = useQuery( GET_VENDOR_SIDEBAR_DATA );
    const [ isFirst, setFirst ] = useState( true );
    let sidebarData = data && data.shopSidebarData;
    let bestSelling = data && data.specialProducts.bestSelling;
    let topRated = data && data.specialProducts.topRated;
    let timerId;

    useEffect( () => {
        window.addEventListener( 'resize', hideSidebar );

        return () => {
            window.removeEventListener( 'resize', hideSidebar );
        }
    }, [] )

    useEffect( () => {
        if ( isFirst ) {
            setFirst( false );
        } else {
            scrollTopHandler();
        }
    }, [ query ] )

    const showSidebar = ( e ) => {
        e.preventDefault();
        document.querySelector( 'body' ).classList.add( "sidebar-active" );
    }

    const hideSidebar = () => {
        document.querySelector( 'body' ).classList.remove( `${ type === "left" ? "sidebar-active" : "right-sidebar-active" }` );
    }

    return (
        <aside className={ `skeleton-body sidebar-fixed sticky-sidebar-wrapper ${ type === "left" ? "sidebar" : "right-sidebar" } ${ adClass }` }>
            <div className="sidebar-overlay" onClick={ hideSidebar }></div>
            {
                type === "boxed" || type === "banner" ? <a href="#" className="sidebar-toggle" onClick={ showSidebar }><i className="fas fa-chevron-right"></i></a> : ''
            }
            <ALink className="sidebar-close" href="#" onClick={ hideSidebar }><i className="d-icon-times"></i></ALink>

            <div className="sidebar-content">
                {
                    !loading && sidebarData ?
                        <div className="sticky-sidebar">
                            <div className="widget widget-collapsible">
                                <Card title="<h3 class='widget-title'>Store Product Category<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={ true }>
                                    <ul className="widget-body filter-items search-ul">
                                        {
                                            data && sidebarData.categories.map( ( item, index ) => (
                                                item.children ?
                                                    <li
                                                        key={ item.name + ' - ' + index }
                                                        className={ `with-ul overflow-hidden ${ item.slug === query.category || item.children.findIndex( subCat => subCat.slug === query.category ) > -1 ? 'show' : '' } ` }
                                                    >
                                                        <SlideToggle collapsed={ true } >
                                                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                                                <>
                                                                    <ALink href={ { pathname: router.pathname, query: { category: item.slug, grid: query.grid } } } scroll={ false }>{ item.name }
                                                                        <i className={ `fas fa-chevron-down ${ toggleState.toLowerCase() }` } onClick={ e => { onToggle(); e.stopPropagation(); e.preventDefault(); } }></i>
                                                                    </ALink>

                                                                    <div ref={ setCollapsibleElement }>
                                                                        <div>
                                                                            <ul style={ { display: "block" } }>
                                                                                {
                                                                                    item.children.map( ( subItem, index ) =>
                                                                                        <li key={ subItem.name + ' - ' + index }
                                                                                            className={ `with-ul ${ subItem.slug === query.category ? 'show' : '' } ` }>
                                                                                            <ALink scroll={ false } href={ { pathname: router.pathname, query: { category: subItem.slug, grid: query.grid } } }>{ subItem.name }</ALink>
                                                                                        </li>
                                                                                    ) }
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) }
                                                        </SlideToggle >
                                                    </li> :
                                                    <li
                                                        className={ query.category === item.slug ? 'show' : '' }
                                                        key={ item.name + ' - ' + index }
                                                    >
                                                        <ALink href={ { pathname: router.pathname, query: { category: item.slug, grid: query.grid } } } scroll={ false }>{ item.name }
                                                        </ALink>
                                                    </li>
                                            ) )
                                        }
                                    </ul>
                                </Card>
                            </div>

                            <div className="widget widget-collapsible widget-contact-vendor">
                                <Card title="<h3 class='widget-title'>Contact Vendor<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={ true }>
                                    <div className="widget-body">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required />
                                        <input type="text" className="form-control" id="address" name="address" placeholder="you@example.com" required />
                                        <textarea id="message" cols="30" rows="6" className="form-control" placeholder="Type your message..." required />
                                        <button type="submit" className="btn btn-dark btn-rounded">Send Message</button>
                                    </div>
                                </Card>
                            </div>

                            <div className="widget widget-collapsible">
                                <Card title="<h3 class='widget-title'>Store Time<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={ true }>
                                    <ul className="widget-body widget-store-time">
                                        <li>
                                            <label>Sunday</label><span>6:00 am - 10:00 pm</span>
                                        </li>
                                        <li>
                                            <label>Monday</label><span>6:00 am - 10:00 pm</span>
                                        </li>
                                        <li>
                                            <label>Tuesday</label><span>6:00 am - 10:00 pm</span>
                                        </li>
                                        <li>
                                            <label>Wednesday</label><span>6:00 am - 10:00 pm</span>
                                        </li>
                                        <li>
                                            <label>Thursday</label><span>6:00 am - 10:00 pm</span>
                                        </li>
                                        <li>
                                            <label>Friday</label><span>6:00 am - 10:00 pm</span>
                                        </li>
                                        <li>
                                            <label>Saturday</label><span>6:00 am - 10:00 pm</span>
                                        </li>
                                    </ul>
                                </Card>
                            </div>

                            <div className="widget widget-collapsible">
                                <Card title="<h3 class='widget-title'>Best Selling Product<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={ true }>
                                    <div className="widget-body mt-2 mb-6">
                                        {
                                            bestSelling.map( ( item, index ) => (
                                                <SmallProduct
                                                    product={ item }
                                                    key={ item.name + ' - ' + index }
                                                />
                                            ) )
                                        }
                                    </div>
                                </Card>
                            </div>

                            <div className="widget widget-collapsible">
                                <Card title="<h3 class='widget-title'>Top Rated Product<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={ true }>
                                    <div className="widget-body mt-2 mb-6">
                                        {
                                            topRated.map( ( item, index ) => (
                                                <SmallProduct
                                                    product={ item }
                                                    key={ item.name + ' - ' + index }
                                                />
                                            ) )
                                        }
                                    </div>
                                </Card>
                            </div>
                        </div>
                        : <div className="widget-2 mt-10 pt-5"></div>
                }
            </div>
        </aside >
    )
}

export default withApollo( { ssr: typeof window === 'undefined' } )( SidebarFilterOne );