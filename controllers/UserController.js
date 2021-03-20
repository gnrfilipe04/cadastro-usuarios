class UserController {
  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);

    this.onSubmit();
  }

  onSubmit() {
    this.formEl.addEventListener("submit", (e) => {
      e.preventDefault();

      const values = this.getValues();

      if(!values) return false

      this.getphoto().then(
          content => {

          values.photo = content;

          this.addLine(values);
        },
        (e) => {

          console.error(e);

        }
      );
    });
  }

  getphoto() {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      const [...fields] = this.formEl.elements;

      let elements = fields.filter((item) => {
        return item.name === "photo" ?? item;
      });

      let file = elements[0].files[0];

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (e) => {
        reject(e);
      };

      fileReader.readAsDataURL(file ? file : resolve("dist/img/boxed-bg.jpg"));
    });
  }

  getValues() {
    let user = {};
    let isValid = true;
    
    const [...fields] = this.formEl.elements;

    fields.map((field) => {

      if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){

        field.parentElement.classList.add('has-error')
        isValid = false

    }

      if (field.name) {
        if (field.name == "gender") {
          if (field.checked) {
            user[field.name] = field.value;
          }
        } else if (field.name == "admin") {
          user[field.name] = field.checked;
        } else {
          user[field.name] = field.value;
        }
      }
    });

    if(!isValid){
      return false
  }

    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );
  }

  addLine(dataUser) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td><img src=${dataUser.photo} class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin ? "Sim" : "Não"}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;

    this.tableEl.appendChild(tr);
  }

}
