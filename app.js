var app = new Vue({
  el: '#app',
  data: {
    questionario: [],
    indice: Math.floor(Math.random() * 15),
    indices: [],
    tempo: 0,
    tempoResposta:0,
    tempoTotal:0,
    resposta: 0,
    vidas: 3,
    melhorPontucao: 0
  },
  methods: {
    trocarIndice: function() {
      while (this.indices.includes(this.indice)){
        this.indice = Math.floor(Math.random() * 15);
      }
      this.salvarIndice(this.indice)
      return this.indice
    },
    salvarIndice: function(indice) {
      this.indices.push(indice)
      // Verificar se ainda há perguntas, senão mostrar o ecrã final
    },
    enviarResposta: function() {
      if (Number(this.resposta) != Number(this.questao.opc)) {
        this.vidas--
      }
      this.trocarIndice()
      this.resposta = 0
      this.tempo = 15
    },
    jogarNovamente: function() {
      this.Indices = []
      this.resposta = 0
      this.indice = this.trocarIndice()
      this.vidas = 3

    },
    timer: function() {
      setInterval(() => {
        if (this.tempo >= 0) 
          this.tempo = this.tempo - 1
      }, 1000)
    },
    verificarPontuacao: function() {
      let vidas = this.vidas
      if (vidas >= 0) {
        this.melhorPontuacao = localstorage.getItem("melhorPontuacao")
      }
      if (this.indices.length > this.melhorPontuacao) {

      }
    }
  },
  computed: {
    questao: function() {
      let questao = this.questionario[this.indice];
      return questao
    },
    nivel: function() {
        let nivel = ((this.indices.length / this.questionario.length) * 100).toFixed(2)
      return nivel
    }
  },
  created: function() {
    this.timer()
    this.tempo = 15
    this.indice = this.trocarIndice()
    fetch('./db.json')
      .then( resposta => resposta.json())
      .then(dados => {
        this.questionario = dados
      })
  },
  watch: {
    tempo: function() {
      if (this.tempo <= 0) {
        this.vidas--
        this.resposta = 0
        this.trocarIndice()
      }
    },
    vidas: function() {
      if (this.vidas <= 0) {
        this.tempo = 0
      }
      this.verificarPontuacao()
    }
  }
})