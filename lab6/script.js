const students = [
    {'Name': 'Ivan', 'Surname': 'Ivanov', 'Age': 19, 'AverageMark': 3 },
    {'Name': 'Petr', 'Surname': 'Petrov', 'Age': 20, 'AverageMark': 4 },
    {'Name': 'Nikolay', 'Surname': 'Sobolev', 'Age': 17, 'AverageMark': 9.5 },
    {'Name': 'Alex', 'Surname': 'Pushkin', 'Age': 24, 'AverageMark': 6.5 }
];

function StudentTable(props) {
    const { students } = props;
    return (
        <table border={1} cellPadding={10}>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Mark</th>
            </tr>
            {students.map((student, i) => <StudentRow student={students[i]}/>)}
        </table>
    );
}

function StudentRow(props) {
    const { student } = props;
    
    return (
        <tr style={{background: props.color}}>
            <td>{student.Name}</td>
            <td>{student.Surname}</td>
            <td>{student.Age}</td>
            <td>{student.AverageMark}</td>
        </tr>
    );
}

ReactDOM.render(
    <StudentTable students={students} />,
    document.getElementById('app')
)