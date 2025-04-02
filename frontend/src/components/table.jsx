

const Table = ({data}) => {
    const headings = Object.keys(data);
    return (
    <>
        <table className="table">
            <thead>
            <tr>
                {
                headings.map((heading, i) => (
                <th key={i}>
                    {heading}
                </th>
                ))
            }
            </tr>
            
            </thead>
            <tbody>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
            </tbody>
        </table>
    </>
    );
};

export default Table;