const Table = ({data}) => {
    const headings = Object.keys(data)
    const table_rows = Object.values(data)
    
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
            {
                table_rows.map((table_row, j) => (
                    <tr key={j}>
                        {
                            table_row.map((table_data, k) => (
                                <td key={k}>
                                    {table_data}
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </table>
    );
};

export default Table;