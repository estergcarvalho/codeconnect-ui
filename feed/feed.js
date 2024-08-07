$(document).ready(function() {
    dadosPerfil();
    listarPostagens();
    reacaoComentario();
    comentar();
    carregarAtividadesRecentes();
    carregarMusicas();
    carregarTabNews();
    fazerComentario();
    fazerPublicacao();
    publicarFeed();
    habilitarPublicacao();
    reacaoCurtir();
    removerCurtida();
    totalCurtidas();
});

function dadosPerfil() {
    var token = localStorage.getItem('token');
    
    $.ajax({
        url: 'http://localhost:8080/usuarios/perfil',
        type: 'GET',
        contentType: 'application/json',
        headers: {'Authorization': 'Bearer ' + token},
        success : function(perfil) {
            var imagem = carregarImagem(perfil);

            $("#profile-user-data").attr('src', imagem).attr('alt', 'Foto de' + perfil.nome);
            $("#profile-user-link").attr('href','/perfil/perfil.html?id=' + perfil.id);
        },
        error: function(response) {
            tokenExpirado(response);
        }
    });
}

function publicarFeed() {
    $("#btn-publicar").click(function() {
        var cardPublicarFeed = $(".card-post-publish-loading");
        cardPublicarFeed.fadeIn();
        cardPublicarFeed.LoadingOverlay("show");

        var desabilitarPublicacao = $('.card-post-create-publish-btn');
        desabilitarPublicacao.attr('disabled', true);

        var publicacao = $("#publicacao");
        var publicacaoTexto = publicacao.val();

        var token = localStorage.getItem('token');

        $.ajax({
            url: 'http://localhost:8080/posts',
            type: 'POST',
            contentType: 'application/json',
            headers: {'Authorization': 'Bearer ' + token},
            data: JSON.stringify({ descricao: publicacaoTexto }),
            success: function(response) {
                var imagem =  carregarImagem(response);

                $(".card-post-container").prepend(
                    `<div class="card-post card">
                        <div class="card-header">
                             <div class="row">
                                <div class="card-post-avatar col-2">
                                        <a href="/perfil/perfil.html?id=` + response.id + `">
                                        <img src="`+ imagem +`" alt="Foto de `+ response.nome +`">
                                    </a>
                                </div>
                                    
                                <div class="col-10 card-post-user">
                                    <div class="card-post-user-name">
                                        <div>
                                            <a href="/perfil/perfil.html?id=` + response.id + `">`+ response.nome +`</a>
                                        </div>  
                                        <div class="card-post-profession">
                                            `+ response.profissao +`
                                        </div>  
                                        <div class="card-post-date">
                                            1 hora
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-post-text">
                            `+ response.descricao +`
                            </p>
                        </div>
                        <div class="card-footer pb-0">
                            <div class="card-reactions-count">
                                <a href="#" class="card-reactions-count-likes">10 curtidas</a>
                                <a href="#">2 comentários</a>
                            </div>
                            <hr class="card-line card-line-count">
                            <div class="card-reactions">
                                <a class="card-reactions-like" href="#" id="0">
                                    <i class="bi bi-heart" id="img-like-1"></i>
                                    <span>Curtir</span>
                                </a>
                                <a class="card-reactions-comment" href="#" id="0">
                                    <i class="bi bi-chat"></i>
                                    <span>Comentar</span>
                                </a>
                                <a href="#">
                                    <i class="bi bi-share"></i>
                                    <span>Compartilhar</span>
                                </a>
                            </div>

                            <hr class="card-line card-line-reactions">

                            <div class="card-comment">
                                <img class="card-comment-avatar" src="`+ imagem +`" alt="Foto de `+ response.nome +`">

                                <div class="card-comment-text mb-3">
                                    <textarea class="card-comment-text-area" id="card-comment-text-1" placeholder="Escreva um comentário..."></textarea>
                                    <label class="form-label d-none" for="card-comment-text-1"></label>
                                    <button class="card-comment-btn" id="btnComentar" type="button">Comentar</button>
                                </div>     
                            </div>
                        </div>
                    </div>`
                );

                cardPublicarFeed.LoadingOverlay("hide");
                cardPublicarFeed.fadeOut();
                publicacao.val('');
                desabilitarPublicacao.attr('disabled', false);
            },
            error: function(response) {
                tokenExpirado(response);
            }
        });
    });
}

function fazerPublicacao() {
    $("#publicacao").on('input', function() {
        $(this).css('height', this.scrollHeight + 'px');

        var texto = $(this).val().trim();

        if (texto === "") {
            $(this).css('height', '');
        }
    });
}

function habilitarPublicacao() {
    $("#publicacao").on('input', function() {
        var habilitarBtn = $('.card-post-create-publish-btn');
        var publicacao = $(this).val().trim();

        if (publicacao === "") {
            habilitarBtn.attr('disabled', true);
        } else {
            habilitarBtn.removeAttr('disabled');
        }
    });
}

function listarPostagens() {
    var token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/posts/recentes",
        type: 'GET',
        dataType: "json",
        headers: {'Authorization': 'Bearer ' + token},
        success: function(data) {
            data.forEach(function(post) {
                var imagem = carregarImagem(post.usuario);
                let curtidoClasse = post.curtido ? 'card-reactions-unlike' : 'card-reactions-like';
                let curtidoIcone = post.curtido ? 'bi-heart-fill' : 'bi-heart';
                let curtidoTexto = post.curtido ? 'card-reactions-like-text' : '';
                
                $('#lista-postagem').append(
                    `<div class="card-post card">
                        <div class="card-header">
                            <div class="row">
                                <div class="card-post-avatar col-2">
                                    <a href="/perfil/perfil.html?id=` + post.usuario.id + `">
                                        <img src=" `+ imagem +`" id="profile-image-user" alt="Foto de `+ post.usuario.nome +`">
                                    </a>
                                </div>
                                
                                <div class="col-10 card-post-user">
                                    <div class="card-post-user-name">
                                        <div>
                                            <a href="/perfil/perfil.html?id=` + post.usuario.id + `">`+ post.usuario.nome +`</a>
                                        </div>  
                                        <div class="card-post-profession">
                                            `+ post.usuario.profissao +`
                                        </div>  
                                        <div class="card-post-date">
                                            1 hora
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <p class="card-post-text">
                                `+ post.descricao +`
                            </p>
                        </div>
                        <div class="card-footer pb-0">
                            <div class="card-reactions-count">
                                <a href="#" class="card-reactions-count-likes" id="curtida-`+ post.id +`">0 curtidas</a>
                                <a href="#">0 comentários</a>
                            </div>

                            <hr class="card-line card-line-count">

                            <div class="card-reactions">
                                <a class="`+ curtidoClasse +`" href="#" id="`+ post.id +`">
                                    <i class="`+ curtidoIcone +`" id="`+ post.id +`"></i>
                                    <span class="`+ curtidoTexto +`">Curtir</span>
                                </a>

                                <a class="card-reactions-comment" href="#" id="0">
                                    <i class="bi bi-chat"></i>
                                    <span>Comentar</span>
                                </a>

                                <a href="#">
                                    <i class="bi bi-share"></i>
                                    <span>Compartilhar</span>
                                </a>
                            </div>

                            <hr class="card-line card-line-reactions">

                            <div class="card-comment">
                                   <img class="card-comment-avatar" src=" `+ imagem +`" alt="Foto de `+ post.usuario.nome +`">
                                <div class="card-comment-text mb-3">
                                    <textarea class="card-comment-text-area" id="card-comment-text-2" placeholder="Escreva um comentário..."></textarea>
                                    <label class="form-label d-none" for="card-comment-text-1"></label>
                                    <button class="card-comment-btn" id="btnComentar" type="button">Comentar</button>
                                </div>
                            </div>
                        </div>
                    </div>`
                );
            });
        },
        error: function(response) {
            tokenExpirado(response);
        }
    });                  
}

function reacaoCurtir() {
    $(document).on('click', '.card-reactions-like', function(e) {
        e.preventDefault();

        var token = localStorage.getItem('token');
        var $this = $(this);
        var id = $(this).attr('id');

        $.ajax({
            url: 'http://localhost:8080/posts/' + id + '/curtir',
            type:'POST',
            contentType:'application/json',
            headers: {'Authorization': 'Bearer ' + token},
            success: function() {
                $this.removeClass("card-reactions-like").addClass("card-reactions-unlike");
                $this.find("i").removeClass("bi-heart").addClass("bi-heart-fill");
                $this.find("span").addClass("card-reactions-like-text");

                totalCurtidas(id);
            },
            error: function(error) {
                console.log("Erro ao curtir", error);
            }
         }); 
    });           
}

function removerCurtida() {
    $(document).on('click', '.card-reactions-unlike', function(e) {
        e.preventDefault();
       
        var token = localStorage.getItem('token');
        var $this = $(this);
        var id = $(this).attr('id');

        if (id != null) {
            $.ajax({
                url: 'http://localhost:8080/posts/' + id + '/remover-curtida',
                type: 'DELETE',
                contentType: 'application/json',
                headers: {'Authorization': 'Bearer ' + token},
                success: function() {
                    $this.removeClass("card-reactions-unlike").addClass("card-reactions-like");
                    $this.find("i").removeClass("bi-heart-fill").addClass("bi-heart");
                    $this.find("span").removeClass("card-reactions-like-text");

                    totalCurtidas(id);
                },
                error: function(error) {
                    console.log("Erro ao remover curtida", error);
                }
            });
        }
    }); 
}

function totalCurtidas(id) {
    var token = localStorage.getItem('token');

    if (id != null) {
        $.ajax({
            url: 'http://localhost:8080/posts/' + id + '/total-curtidas',
            type: 'GET',
            contentType: 'application/json',
            headers: {'Authorization': 'Bearer ' + token},
            success: function(response) {
                var total = response.total;
                var textoCurtida = total > 1 ? 'curtidas' : 'curtida';

                $('#curtida-' + id).text(total + ' ' + textoCurtida);
            },
            error: function(error) {
                console.log("Erro ao retornar total de curtidas", error);
            },
        });
    }
}

function reacaoComentario() {
    $(".card-reactions-comment").click(function(e) {
        e.preventDefault();

        var id = $(this).prop("id");

        $("#card-comment-text-" + id).focus();
    });
}

function comentar() {
    $(".card-comment-text-area").on("keyup", function() {

        $(this).siblings("#btnComentar").hide();

        var texto = $(this).val().trim();

        if (texto !== "") {
            $(this).siblings("#btnComentar").show();
        }
    });
}

function carregarAtividadesRecentes() {
    var cardTimeline = $(".card-timeline-activity-body");

    cardTimeline.LoadingOverlay("show");

    setTimeout(function() {
        cardTimeline.LoadingOverlay("hide");
    }, 3000);
}

function carregarMusicas() {
    var cardPlaylistMusica = $(".card-playlist-music-body");

    cardPlaylistMusica.LoadingOverlay("show");

    setTimeout(function() {
        cardPlaylistMusica.LoadingOverlay("hide");
    }, 3000);
}

function carregarTabNews() {
    var cardTabNews = $(".card-tab-news-body");

    cardTabNews.LoadingOverlay("show");

    setTimeout(function() {
        cardTabNews.LoadingOverlay("hide");
    }, 3000);
}

function fazerComentario() {
    $(".card-comment-text-area").on('input', function() {
        $(this).css('height', this.scrollHeight + 'px');

        var texto = $(this).val().trim();

        if (texto === "") {
            $(this).css('height', '');
        }
    });
}

