const fs = require('fs');

type Endereco = {
    cep: number,
    rua: string,
    complemeto?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco?: Endereco | null
}

const cadastrarUsuario = (info: Usuario): Usuario => {
  const bd = lerArquivos() as Usuario[]
  bd.push(info);
  escreverArquivo(bd);
  return info;
}

const lerArquivos = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
}

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
}

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivos() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    })
    if(!usuario){
        throw new Error ("Usuário não encontrado");
    }
    return usuario;
}

const atualizarUsuario = (cpf: string, info: Usuario): Usuario => {
    const bd = lerArquivos() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    })
    if(!usuario){
        throw new Error ("Usuário não encontrado");
    }
    Object.assign(usuario, info);
    escreverArquivo(bd);
    return info;
}

const excluirUsuario = (cpf:string): Usuario => {
    const bd = lerArquivos() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    })
    if(!usuario){
        throw new Error ("Usuário não encontrado");
    }
    const exclusao = bd.find(usuarios => {
        return usuarios.cpf !== cpf;
    })
    escreverArquivo(exclusao);
    return usuario;
}

const filtarUsuario = (filter?: string): Usuario[] =>{
    const bd = lerArquivos() as Usuario[];
    const users = bd.filter((user) => {
        if(filter){
            return user.profissao === filter;
        }
        return user;
    })
    return users;
}

// cadastrarUsuario({
//     nome: "Emily",
//     email: "qualquer@email.com",
//     cpf: "380182301",
//     endereco: {
//         cep: 1939291,
//         rua: "minha rua ",
//         bairro: "meu bairro",
//         cidade: "minha cidade"
//     }
// });


console.log(excluirUsuario("380182301"), "\n")
console.log(lerArquivos());
