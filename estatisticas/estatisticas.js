$(document).ready(function() {
  estatisticasPostagens();
  estatiscasCurtidas();
  estatisticasCompatilhamentos();
  estatisticasComentarios();
  graficoPostagemMes();
  graficoMesCurtidas();
  graficoCargoAmigos();
});

function estatisticasPostagens() {
  const postagens = new CountUp('countPost', 0, 867);

  if (!postagens.error) {
    postagens.start();
  }
}

function estatiscasCurtidas() {
  const curtidas = new CountUp('countLike', 0, 3867);

  if (!curtidas.error) {
    curtidas.start();
  }
}

function estatisticasCompatilhamentos() {
  const compartilhamento = new CountUp('countShared', 0, 863);

  if (!compartilhamento.error) {
    compartilhamento.start();
  }
}

function estatisticasComentarios() {
  const comentarios = new CountUp('countComments', 0, 567);
  
  if (!comentarios.error) {
    comentarios.start();
  }
}

function graficoPostagemMes() {
  var amigos = echarts.init($('#friends')[0]);

  var optionAmigos = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [123, 290, 524, 418, 135, 347],
        type: 'line',
        itemStyle: {
          color: '#64CCC5'
        }
      }
    ]
  };

  amigos.setOption(optionAmigos);
}

function graficoMesCurtidas() {
  var curtidas = echarts.init($('#likes')[0]);

  var optionCurtidas = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 29, 52, 18, 158, 32],
        type: 'bar',
        itemStyle: {
          color: '#daa520'
        }
      }
    ]
  };

  curtidas.setOption(optionCurtidas);
}

function graficoCargoAmigos() {
  var cargosAmigos = echarts.init($('#jobsFriends')[0]);

  var optionCargos = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        label: {
          color: 'white',
          borderColor: 'white'
        },
        name: 'Cargo',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 148, name: 'Desenvolvedor Backend' },
          { value: 378, name: 'Analista Big Data' },
          { value: 98, name: 'Cientista de dados' },
          { value: 251, name: 'Quality Analyst' },
          { value: 216, name: 'Desenvolvedor Full Stack' },
          { value: 65, name: 'Product Owner' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetx: 0,
            shadowColor: 'rgba(0,0,0,0,0)',
            color: '#daa520'
          }
        }
      }
    ]
  };

  cargosAmigos.setOption(optionCargos);
}