export const QUOTES_MAP = {
  ABEV3: {
    fullName: 'AMBEV',
    img: '',
  },
  AZUL4: {
    fullName: 'Azul SA',
    img: '',
  },
  B3SA3: {
    fullName: 'B3 SA - Brasil Bolsa Balcao',
    img: '',
  },
  BBAS3: {
    fullName: 'Banco do Brasil SA',
    img: '',
  },
  BBDC4: {
    fullName: 'Banco Bradesco SA Preference Shares',
    img: '',
  },
  BBSE3: {
    fullName: 'BB Seguridade',
    img: '',
  },
  BRDT3: {
    fullName: 'BR Distribuidora',
    img: '',
  },
  BRFS3: {
    fullName: 'BRF',
    img: '',
  },
  BTOW3: {
    fullName: 'B2W DIGITAL ON',
    img: '',
  },
  CCRO3: {
    fullName: 'Grupo CCR',
    img: '',
  },
  CIEL3: {
    fullName: 'Cielo',
    img: '',
  },
  CMIG4: {
    fullName: 'Energy of Minas Gerais Co Preference Shares',
    img: '',
  },
  CSNA3: {
    fullName: 'Companhia Siderúrgica Nacional',
    img: '',
  },
  CVCB3: {
    fullName: 'CVC Brasil',
    img: '',
  },
  ELET3: {
    fullName: 'Brazilian Electric Power Co',
    img: '',
  },
  ELET6: {
    fullName: 'Brazilian Electric Power Co Preference Shares Series B',
    img: '',
  },
  GGBR4: {
    fullName: 'Gerdau',
    img: '',
  },
  GNDI3: {
    fullName: 'Notre Game Intermedica Participacoes ORD',
    img: '',
  },
  GOAU4: {
    fullName: 'Metalurgica Gerdau SA Preference Shares',
    img: '',
  },
  GOLL4: {
    fullName: 'Gol Linhas Aereas Inteligentes SA Preference Shares',
    img: '',
  },
  IRBR3: {
    fullName: 'IRB (Re)',
    img: '',
  },
  ITSA4: {
    fullName: 'Itausa SA Preference Shares',
    img: '',
  },
  ITUB4: {
    fullName: 'Itaú Unibanco',
    img: '',
  },
  JBSS3: {
    fullName: 'JBS',
    img: '',
  },
  KROT3: {
    fullName: 'KROTON ON',
    img: '',
  },
  LREN3: {
    fullName: 'Lojas Renner',
    img: '',
  },
  MGLU3: {
    fullName: 'Magazine Luiza',
    img: '',
  },
  MRFG3: {
    fullName: 'Marfrig',
    img: '',
  },
  NATU3: {
    fullName: 'NATURA ON',
    img: '',
  },
  PCAR4: {
    fullName: 'Grupo Pão de Açúcar',
    img: '',
  },
  PETR3: {
    fullName: 'Petroleo Brasileiro SA Petrobras',
    img: '',
  },
  PETR4: {
    fullName: 'Petroleo Brasileiro SA Petrobras Preference Shares',
    img: '',
  },
  RADL3: {
    fullName: 'RaiaDrogasil',
    img: '',
  },
  RAIL3: {
    fullName: 'Rumo SA',
    img: '',
  },
  RENT3: {
    fullName: 'Localiza',
    img: '',
  },
  SBSP3: {
    fullName: 'Sabesp',
    img: '',
  },
  SUZB3: {
    fullName: 'Suzano SA',
    img: '',
  },
  UGPA3: {
    fullName: 'Grupo Ultra',
    img: '',
  },
  VALE3: {
    fullName: 'Vale S.A.',
    img: '',
  },
  VVAR3: {
    fullName: 'Casas Bahia ON',
    img: '',
  },
};

export type QuoteName = keyof typeof QUOTES_MAP;

export interface Quote {
  id: QuoteName;
  currentValue: number;
  lastValue: number;
  timestamp: number;
  order?: number;
}

export type QuotesMap = Partial<{
  [Property in keyof typeof QUOTES_MAP]: {
    values: number[];
    timestamp: number;
  };
}>;
