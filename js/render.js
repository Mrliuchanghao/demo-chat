$(document).ready(() => {
  console.log(window.userList);
  let userList = window.userList;
  let meInfo = window.meInfo;

  function formatDateTime(date) {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }

  $("#curFriend .name").html(userList[0]);

  userList.forEach((item, ind) => {
    let personListItemTemp = `<div
    data-v-d74d3096=""
    data-v-c6884a34=""
    sortId="${ind}"
    class="person-card ${ind == 0 ? "activeCard" : ""}"
  >
    <div data-v-d74d3096="" class="info">
      <div
        data-v-24585c4b=""
        data-v-d74d3096=""
        class="head-portrait"
      >
        <img
          data-v-24585c4b=""
          src="./img/head_portrait${ind + 1}.jpg"
          alt=""
        />
      </div>
      <div data-v-d74d3096="" class="info-detail" >
        <div data-v-d74d3096="" class="name">${item}</div>
        <div data-v-d74d3096="" class="detail"></div>
      </div>
      
    </div>
  </div>`;
    $("#personList").append(personListItemTemp);
  });

  let curUserId = 0;
  $("#personList").on("click", ".person-card", function () {
    curUserId = parseInt($(this).attr("sortId"));
    $(".person-card.activeCard").removeClass("activeCard");
    $(this).addClass("activeCard");
    $("#curFriend .name").html(userList[curUserId]);
    $("#chat-content-id").html("")
    $("#curHead").attr('src',`./img/head_portrait${curUserId+1}.jpg`)
  });

  $("#chatInputs").on("keyup", function (e) {
    if (e.keyCode === 13) {
      // 执行回车键触发的操作
      var inputValue = $(this).val(); // 获取input的值
      console.log(inputValue); // 输出input的值
      let time = inputValue.split("&&")[1];
      let text = inputValue.split("&&")[0];
      let temp = `<div data-v-13fede38="" class="chat-wrapper">
                          <div data-v-13fede38="" class="chat-me">
                            <div data-v-13fede38="" class="info-time">
                                <span data-v-13fede38="">${meInfo}</span
                                ><span data-v-13fede38=""
                                  >${
                                    time ? time : formatDateTime(new Date())
                                  }</span
                                ><img
                                  data-v-13fede38=""
                                  src="./img/head_portrait.jpg"
                                  alt=""
                                />
                              </div>
                            <div data-v-13fede38="" class="chat-text">${text}</div>
                            
                          </div>
                        </div>`;

      $("#chat-content-id").append(temp);
    }
  });

  $("#chatInputs-friend").click(function () {
    let str = $("#chatInputs").val();
    let time = str.split("&&")[1];
    let text = str.split("&&")[0];
    let temp = ` <div data-v-13fede38="" class="chat-wrapper">
                          <div data-v-13fede38="" class="chat-friend">
                            <div data-v-13fede38="" class="info-time">
                                <img
                                  data-v-13fede38=""
                                  src="./img/head_portrait${curUserId+1}.jpg"
                                  alt=""
                                /><span data-v-13fede38="">${userList[curUserId]}</span
                                ><span data-v-13fede38=""
                                  >${
                                    time ? time : formatDateTime(new Date())
                                  }</span
                                >
                              </div>
                            <div data-v-13fede38="" class="chat-text">${text}</div>
                            
                          </div>
                        </div>`;

    $("#chat-content-id").append(temp);
  });

  $("#uploadImg").click(function () {
    $("#image-input").click();
  });
  let curNeedAddImgDom = null;
  $(".chat-content").on("click", ".chat-text", function () {
    curNeedAddImgDom = $(this);
    $("#image-input").click();
  });

  $("#image-input").on("change", function (e) {
    var file = e.target.files[0]; // 获取文件引用
    if (file && file.type.match("image.*")) {
      // 检查是否为图片文件
      var reader = new FileReader(); // 创建FileReader对象
      reader.onload = function (ev) {
        // 文件读取成功完成后的处理
        let imgStr = `
                        <img class="image-preview" src="${ev.target.result}" />
        `;
        curNeedAddImgDom.html(imgStr);
        e.target.value = "";
      };
      reader.readAsDataURL(file); // 读取文件内容
    }
  });
});
