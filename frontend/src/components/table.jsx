const Table = ({data, type}) => {
    const headings = Object.keys(data)
    const users = data
    const issues = data
    const logs = data
    return (
        <table>
            <tr className="headings">
            {
            headings.map((heading, i) => (
                <th key={i}>
                    {heading}
                </th>
            ))
            }                
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
        </table>
    );
};

export default Table;