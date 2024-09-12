class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
    ];

    this.animaisPermitidos = {
      'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
      'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
      'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
      'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
      'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
      'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
    };
  }

  analisaRecintos(especie, quantidade) {
    if (!this.animaisPermitidos[especie]) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const animal = this.animaisPermitidos[especie];
    const tamanhoNecessario = animal.tamanho * quantidade;
    const recintosViaveis = [];

    this.recintos.forEach((recinto) => {
      let espacoOcupado = 0;
      let carniPorco = false;
      let multiEspecies = false;

      if (!animal.biomas.includes(recinto.bioma)) {
        return;
      }

      for (const animalExistente of recinto.animais) {
        const especieExistente = this.animaisPermitidos[animalExistente.especie];
        espacoOcupado += especieExistente.tamanho * animalExistente.quantidade;

        if (especieExistente.carnivoro || animal.carnivoro) {
          carniPorco = true;
        }

        if (recinto.animais.length > 1) {
          multiEspecies = true;
        }
      }

      if (carniPorco && recinto.animais.length > 0 && recinto.animais[0].especie !== especie) {
        return;
      }

      if (multiEspecies) {
        espacoOcupado += 1;
      }

      const espacoRestante = recinto.tamanhoTotal - espacoOcupado;

      if (espacoRestante >= tamanhoNecessario) {
        recintosViaveis.push({
          numero: recinto.numero,
          espacoRestante,
          tamanhoTotal: recinto.tamanhoTotal,
        });
      }
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    recintosViaveis.sort((a, b) => a.numero - b.numero);
    const resultado = recintosViaveis.map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoRestante} total: ${recinto.tamanhoTotal})`);

    return { recintosViaveis: resultado };
  }
}

module.exports = RecintosZoo;