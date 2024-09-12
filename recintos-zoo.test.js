import RecintosZoo from './recintos-zoo';

describe('Testes para RecintosZoo', () => {
  let zoo;

  beforeEach(() => {
    zoo = new RecintosZoo();
  });

  test('Deve retornar recintos viáveis para dois macacos', () => {
    const resultado = zoo.analisaRecintos('MACACO', 2);
    expect(resultado).toEqual({
      recintosViaveis: [
        "Recinto 1 (espaço livre: 5 total: 10)",
        "Recinto 2 (espaço livre: 3 total: 5)",
        "Recinto 3 (espaço livre: 2 total: 7)"
      ]
    });
  });

  test('Deve retornar erro para animal inválido', () => {
    const resultado = zoo.analisaRecintos('UNICORNIO', 1);
    expect(resultado).toEqual({ erro: "Animal inválido" });
  });

  test('Deve retornar erro para quantidade inválida', () => {
    const resultado = zoo.analisaRecintos('MACACO', 0);
    expect(resultado).toEqual({ erro: "Quantidade inválida" });
  });

  test('Deve retornar erro quando não há recinto viável', () => {
    const resultado = zoo.analisaRecintos('LEAO', 5);
    expect(resultado).toEqual({ erro: "Não há recinto viável" });
  });
});