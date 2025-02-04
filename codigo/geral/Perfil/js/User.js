export class User{
    constructor(name, lastname, email, phone, password, genre){
        this.name = localStorage.setItem("name",name)
        this.lastname = localStorage.setItem("lastname",lastname)
        this.email = localStorage.setItem("email",email)
        this.phone = localStorage.setItem("phone",phone)
        this.password = localStorage.setItem("password", password)
        this.genre = localStorage.setItem("genre",genre)
    }

    changePassword(email, password){
        if(this.#authenticate(email, password)){
            this.password = prompt("Digite sua nova senha: ");
        }else{
            return null
        }
    }

    #authenticate(email, senha){
        return this.email === email && this.password === senha
    }
}

