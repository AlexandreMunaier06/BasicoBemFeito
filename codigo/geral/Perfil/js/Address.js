export class Address {
    constructor(cep, street, city, state, neighborhood, complement, number) {
      this.cep = cep || localStorage.getItem("cep");
      this.street = street || localStorage.getItem("street");
      this.city = city || localStorage.getItem("city");
      this.state = state || localStorage.getItem("state");
      this.neighborhood = neighborhood || localStorage.getItem("neighborhood");
      this.complement = complement || localStorage.getItem("complement");
      this.number = number || localStorage.getItem("number");
    }
  
    // Método para salvar todos os atributos no Local Storage
    salvar() {
      localStorage.setItem("cep", this.cep);
      localStorage.setItem("street", this.street);
      localStorage.setItem("city", this.city);
      localStorage.setItem("state", this.state);
      localStorage.setItem("neighborhood", this.neighborhood);
      localStorage.setItem("complement", this.complement);
      localStorage.setItem("number", this.number);
    }
  
    // Método para carregar os atributos do Local Storage
    carregar() {
      this.cep = localStorage.getItem("cep");
      this.street = localStorage.getItem("street");
      this.city = localStorage.getItem("city");
      this.state = localStorage.getItem("state");
      this.neighborhood = localStorage.getItem("neighborhood");
      this.complement = localStorage.getItem("complement");
      this.number = localStorage.getItem("number");
    }
  
    // Método para atualizar os atributos e salvar no Local Storage
    atualizar(novoCep, novaStreet, novaCity, novoState, novoNeighborhood, novoComplement, novoNumber) {
      this.cep = novoCep;
      this.street = novaStreet;
      this.city = novaCity;
      this.state = novoState;
      this.neighborhood = novoNeighborhood;
      this.complement = novoComplement;
      this.number = novoNumber;
      this.salvar();
    }
}  