

const Table = ({data}) => {
    const headings = Object.keys(data);
    return (
    <>
        <table>
            <thead className="things">
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
            <tbody className="td">
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