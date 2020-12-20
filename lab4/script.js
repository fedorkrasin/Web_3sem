class Student {
    #name = '';
    #surname = '';
    #age = 0;
    #averageMark = 0;

    constructor(name, surname, age, averageMark) {
        this.#name = name;
        this.#surname = surname;
        this.#age = age;
        this.#averageMark = averageMark;
    }

    get getName() {
        return this.#name;
    }

    get getSurname() {
        return this.#surname;
    }

    get getAge() {
        return this.#age;
    }

    get getAverageMark() {
        return this.#averageMark;
    }

    setTd(className, content) {
        const td = $('<td />');
        td.addClass(className);
        td.text(content);

        return td;
    }

    toJson() {
        return {
            name: this.#name,
            surname: this.#surname,
            age: this.#age,
            averageMark: this.#averageMark,
        };
    }

    writeIntoTable = (order) => {
        const tr = $('<tr />');
        tr.append(this.setTd('name', this.getName));
        tr.append(this.setTd('last-name', this.getSurname));
        tr.append(this.setTd('age', this.getAge));
        tr.append(this.setTd('average-mark', this.getAverageMark));
        $('table').append(tr);

        let editBtn = $('<td class="btn">Edit</td>');  
        tr.append(editBtn);

        $(editBtn).on('click', (e) => {
            studentToEdit = Students.find(x => x.getSurname === this.getSurname);
            $('.add_name').val(studentToEdit.getName);
            $('.add_surname').val(studentToEdit.getSurname);
            $('.add_age').val(studentToEdit.getAge);
            $('.add_average_mark').val(studentToEdit.getAverageMark);
            $('.add__row--btn').text('Save');
        });

        let btn = $('<td class="btn">Delete</td>');
        tr.append(btn);

        $(btn).on('click', (e) => {
            let index = Students.findIndex(x => x.getSurname === this.getSurname);
            Students.splice(index, 1);
            tr.remove();
            updateAverage();
            saveData();
        })
    }
}

getAverageMarkFromTable = () => {
    let sum = 0;

    for (let i = 0; i < Students.length; i++) {
        const mark = $('.average-mark')[i];
        sum += +mark.textContent;
    }

    let totalAverageMark = Math.round((sum / Students.length) * 100) / 100 ;
    return totalAverageMark;
}

const getData = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/json', false);
    xhr.send();
    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    };
    const obj = $.parseJSON(xhr.responseText);
    return obj;
};

const saveData = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/json', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send($.toJSON(Students.map(s => s.toJson())));
};

const obj = getData();

let Students = [];
let studentToEdit = null;

for (let i = 0; i < obj.length; i++) {
    const student = new Student(obj[i].name, obj[i].surname, obj[i].age, obj[i].averageMark);
    Students.push(student);
    student.writeIntoTable(i);
}

const textArea = $('<span />');
textArea.text('Средний балл всех студентов: ' + getAverageMarkFromTable());
$('#text-content').append(textArea);

const updateAverage = () => {
    textArea.text('Средний балл всех студентов: ' + getAverageMarkFromTable());
}

const clearForm = () => {
    $('.add_name').val('');
    $('.add_surname').val('');
    $('.add_age').val('');
    $('.add_average_mark').val('');
    $('.add__row--btn').text('Add row');
};

const addButton = document.querySelector('.add__row--btn');
addButton.addEventListener('click', () => {
    const nameFromInput = $('.add_name').val();
    const surnameFromInput = $('.add_surname').val();
    const ageFromInput = $('.add_age').val();
    const averageMarkFromInput = $('.add_average_mark').val();
    const student = new Student(nameFromInput, surnameFromInput, ageFromInput, averageMarkFromInput)

    if (studentToEdit) {
        let index = Students.findIndex(x => x.getSurname === studentToEdit.getSurname);
        Students[index] = student;
        const row = $('tr')[index + 1];
        const children = $(row).children();
        $(children[0]).text(student.getName);
        $(children[1]).text(student.getSurname);
        $(children[2]).text(student.getAge);
        $(children[3]).text(student.getAverageMark);
    } else {
        Students.push(student);
        student.writeIntoTable(Student.length);
    }
    clearForm();
    saveData();
    updateAverage();
});
