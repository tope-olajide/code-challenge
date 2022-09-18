
interface IPaginationProps {
    isPaginationActive: boolean;
    previousCities(): void;
    nextCities(): void;
    currentPage:number;
}
const Pagination = (props: IPaginationProps) => {
    return (
        <>
            <div className="pagination-container" style={props.isPaginationActive ? { display: "flex" } : { display: "none" }}>
                <button onClick={props.previousCities}>&larr;</button>
                <div><h1 className="pageNumber">Page {props.currentPage}</h1></div>
                <button onClick={props.nextCities}>&rarr;</button>
            </div>
        </>
    )
}
export default Pagination