/*
 betForm.js
*/

var preFireVal = 0;

function updateBetDesc(){
  switch($('#betType').val()){
  case "passline":
    $('#betDesc').html('Payout:<br /> 1 pays 1');
    break;
  case "passlineOdds":
    $('#betDesc').html('Payout:<br />Point 4, 10: 1 pays 2<br />Point 5, 9: 2 pays 3 <br />Point 6, 8: 5 pays 6');
    break;
  case "dontPass":
    $('#betDesc').html('Payout:<br /> 1 pays 1');
    break;
  case "dontPassOdds":
    $('#betDesc').html('Payout:<br />Point 4, 10: 2 pays 1<br />Point 5, 9: 3 pays 2 <br />Point 6, 8: 6 pays 5');
    break;
  case "come":
    $('#betDesc').html('Payout:<br /> 1 pays 1');
    break;
  case "comeOdds":
    $('#betDesc').html('Payout:<br />Point 4, 10: 1 pays 2<br />Point 5, 9: 2 pays 3 <br />Point 6, 8: 5 pays 6');
    break;
  case "dontCome":
    $('#betDesc').html('Payout:<br /> 1 pays 1');
    break;
  case "dontComeOdds":
    $('#betDesc').html('Payout:<br />Point 4, 10: 2 pays 1<br />Point 5, 9: 3 pays 2 <br />Point 6, 8: 6 pays 5');
    break;
  case "place4":
    $('#betDesc').html('Payout:<br /> 5 pays 9');
    break;
  case "place5":
    $('#betDesc').html('Payout:<br /> 5 pays 7');
    break;
  case "place6":
    $('#betDesc').html('Payout:<br /> 6 pays 7');
    break;
  case "place8":
    $('#betDesc').html('Payout:<br /> 6 pays 7');
    break;
  case "place9":
    $('#betDesc').html('Payout:<br /> 5 pays 7');
    break;
  case "place10":
    $('#betDesc').html('Payout:<br /> 5 pays 9');
    break;
  case "big6":
    $('#betDesc').html('Payout:<br /> 1 pays 1');
    break;
  case "big8":
    $('#betDesc').html('Payout:<br /> 1 pays 1');
    break;
  case "field":
    $('#betDesc').html('Payout:<br />Roll 3, 4, 9, 10, 11: 1 pays 1<br />Roll 2, 12: 1 pays 2');
    break;
  case "cAndE":
    $('#betDesc').html('Payout:<br />Craps: 1 pays 3<br />Yo-leven: 1 pays 7<br />No Minimum Bet');
    break;
  case "any7":
    $('#betDesc').html('Payout:<br />1 pays 4<br />No Minimum Bet<br />Increments of 3');
    break;
  case "hard4":
    $('#betDesc').html('Payout:<br /> 1 pays 7');
    break;
  case "hard6":
    $('#betDesc').html('Payout:<br /> 1 pays 9');
    break;
  case "hard8":
    $('#betDesc').html('Payout:<br /> 1 pays 9');
    break;
  case "hard10":
    $('#betDesc').html('Payout:<br /> 1 pays 7');
    break;
  case "aceTwo":
    $('#betDesc').html('Payout:<br /> 1 pays 15');
    break;
  case "snakeEyes":
    $('#betDesc').html('Payout:<br /> 1 pays 30');
    break;
  case "midnight":
    $('#betDesc').html('Payout:<br /> 1 pays 30');
    break;
  case "yoleven":
    $('#betDesc').html('Payout:<br /> 1 pays 15');
    break;
  case "anyCraps":
    $('#betDesc').html('Payout: 1 pays 7<br />No Minimum Bet<br />Increments of 4');
    break;
  case "horn":
    $('#betDesc').html('Payout:<br />Roll 2, 12: 4 pays 27<br />Roll 3, 11: 1 pays 3<br />No Minimum Bet<br />Increments of 4');
    break;
  case "world":
    $('#betDesc').html('Payout:<br />Roll 2, 12: 5 pays 26<br />Roll 3, 11: 5 pays 11<br />Roll 7: Push<br />No Minimum Bet<br />Increments of 5');
    break;
  case "fire":
    $('#betDesc').html('Payout:<br />4 points: 1 pays 24<br />5 points: 1 pays 249<br />6 points: 1 pays 999<br />$10 maximum bet');
    break;
  default:
    return false;
  }
};

function clickAreaPlaceBet(area){
  var name = prettyToName(area.name);
  var oddsPoint = false;
  if(name == 'comeOdds' || name == 'dontComeOdds'){
    oddsPoint = parseInt(area.name.substring(area.name.length - 1));
    if (oddsPoint == 0){
      oddsPoint = 10;
    }
  }
  var _bets = _CRAPS.dealer.betManager.bets;
  var manager = _CRAPS.dealer.betManager;
  if(['passline', 'dontPass'].indexOf(name) != -1){
    if(GameState.point){
      for(i in _bets){
        if((name == 'passline' && _bets[i].type == 'passlineOdds') ||
           (name == 'dontPass' && _bets[i].type == 'dontPassOdds')){
           var betList = $('#singleBetListBG');
           betList.show();
           betList.animate({opacity: 1}, MODAL_FADE_INTERVAL);
           $('#modalScreen').show();
           displayBetArray([manager.getBetById(_bets[i].origBet.bet.betId), _bets[i]]);
           return;
        }
      }
    }else{
      for(i in _bets){
        if((name == 'passline' && _bets[i].type == 'passline') ||
           (name == 'dontPass' && _bets[i].type == 'dontPass')){
           var betList = $('#singleBetListBG');
           betList.show();
           betList.animate({opacity: 1}, MODAL_FADE_INTERVAL);
           $('#modalScreen').show();
           displayBetArray([_bets[i]]);
           return;
        }
      }
    }
  }else if(['come', 'dontCome'].indexOf(name) != -1){
    for(i in _bets){
      if((name == 'come' && _bets[i].type == 'come' && !_bets[i].point) ||
         (name == 'dontCome' && _bets[i].type == 'dontCome' && !_bets[i].point)){
         var betList = $('#singleBetListBG');
         betList.show();
         betList.animate({opacity: 1}, MODAL_FADE_INTERVAL);
         $('#modalScreen').show();
         displayBetArray([_bets[i]]);
         return;
      }
    }
  }else if(['comeOdds', 'dontComeOdds'].indexOf(name) != -1){
    for(i in _bets){
      if((name == 'comeOdds' && _bets[i].type == 'comeOdds' && _bets[i].point == oddsPoint) ||
         (name == 'dontComeOdds' && _bets[i].type == 'dontComeOdds' && _bets[i].point == oddsPoint)){
         var betList = $('#singleBetListBG');
         betList.show();
         betList.animate({opacity: 1}, MODAL_FADE_INTERVAL);
         $('#modalScreen').show();
         displayBetArray([manager.getBetById(_bets[i].origBet.bet.betId), _bets[i]]);
         return;
      }
    }
  }else{
    for(i in _bets){
      if(name == _bets[i].type){
         var betList = $('#singleBetListBG');
         betList.show();
         betList.animate({opacity: 1}, MODAL_FADE_INTERVAL);
         $('#modalScreen').show();
         displayBetArray([_bets[i]]);
         return;
      }
    }
  }
  addBet(area);
}

function displayBetArray(_bets){
  var betListing = $('#singleBetListing');
  if(betListing.children().length > 0){
    betListing.empty();
  }
  var betTable = $(document.createElement('table'));
  betTable.attr('id', 'betTable');
  
  // Bet Table Headings
  var heading = $(document.createElement('thead'));
  var headers = $(document.createElement('tr'));
  headers.width($('#buffer').width());
  headers.append($(document.createElement('th')).width($('#singleBetListWindow').width()*(0.35)).append($(document.createElement('img')).attr('title', 'Bet Type').attr('src', 'img/bet-type.png')))//.html('Type'))
         .append($(document.createElement('th')).width($('#singleBetListWindow').width()*(0.25)).append($(document.createElement('i')).attr('title', 'Bet Amount').attr('class', 'icon-money icon-large')))//.html('Value'))
         .append($(document.createElement('th')).width($('#singleBetListWindow').width()*(0.10)).append($(document.createElement('i')).attr('title', 'Bet On?').attr('class', 'icon-off icon-large')))//.html('On?'))
         .append($(document.createElement('th')).width($('#singleBetListWindow').width()*(0.10)).append($(document.createElement('i')).attr('title', 'Repeat On Win?').attr('class', 'icon-repeat icon-large')))//.html('Repeat?'))
         .append($(document.createElement('th')).width($('#singleBetListWindow').width()*(0.10)).append($(document.createElement('i')).attr('title', 'Bet Point').attr('class', 'icon-exclamation icon-large')))//.html('Point'))
         .append($(document.createElement('th')).width($('#singleBetListWindow').width()*(0.10)).append($(document.createElement('i')).attr('title', 'Remove Bet').attr('class', 'icon-eraser icon-large')));//.html('Clear'));
  heading.append(headers);
  betTable.append(heading);
  betListing.append(betTable);
  
  // Bet Rows
  for(betNum in _bets){
    var newBetRow = $(document.createElement('tr'));
    newBetRow.css('backgroundColor', (betNum%2)?'#666':'#888');
    newBetRow.attr('id', 'betSingle' + _bets[betNum].bet.betId);
    
    var type = $(document.createElement('td'));
    type.html(nameToPretty(_bets[betNum].type));
    
    var val = $(document.createElement('td'));
    val.attr('id', 'valSingle' + _bets[betNum].bet.betId);
    val.html('$' + _bets[betNum].bet.value);
    val.attr('onclick', 'updateSingleBet(' + _bets[betNum].bet.betId + ')');
    val.attr('class', 'clickable');
    if(((_bets[betNum].type == 'passline' ||
         _bets[betNum].type == 'dontPassline') && GameState.point) ||
       ((_bets[betNum].type == 'come' ||
         _bets[betNum].type == 'dontCome') && _bets[betNum].point)){
          val.removeClass('clickable');
          val.removeAttr('onclick');
         }
    
    var betOn = $(document.createElement('input'));
    var on = $(document.createElement('td'));
    betOn.attr('type', 'checkbox');
    betOn.attr('checked', _bets[betNum].bet.on);
    betOn.attr('id', 'onSingle' + _bets[betNum].bet.betId);
    betOn.attr('betNum', _bets[betNum].bet.betId);
    if(['passline', 'dontPass', 'passlineOdds', 'dontPassOdds', 'come', 'dontCome', 'comeOdds', 'dontComeOdds', 'fire'].indexOf(_bets[betNum].type) != -1){
      betOn.attr('disabled', 'true');
    }
    var toggleBet = function(e){
      var betNumber = $($(this)[0]).attr("betNum");
      _CRAPS.dealer.betManager.getBetById(betNumber).bet.on = $($(this)[0]).is(':checked');
    }
    betOn.change(toggleBet);
    on.append(betOn);
    
    var repeat = $(document.createElement('td'));
    var repeatWin = $(document.createElement('input'));
    repeatWin.attr('type', 'checkbox');
    repeatWin.attr('checked', _bets[betNum].repeat);
    repeatWin.attr('id', 'repSingle' + _bets[betNum].bet.betId);
    repeatWin.attr('betNum', _bets[betNum].bet.betId);
    var toggleRepeat = function(e){
      var betNumber = $($(this)[0]).attr("betNum");
      _CRAPS.dealer.betManager.getBetById(betNumber).repeat = $(this).is(':checked');
    }
    repeatWin.change(toggleRepeat);
    if(['passline', 'dontPass'].indexOf(_bets[betNum].type) != -1){
      repeatWin.attr('disabled', 'true');
    }
    if(['passlineOdds', 'dontPassOdds', 'comeOdds', 'dontComeOdds'].indexOf(_bets[betNum].type) != -1){
      repeatWin.attr('disabled', 'true');
    }
    repeat.append(repeatWin);
    
    var point = $(document.createElement('td'));
    if(['come', 'dontCome'].indexOf(_bets[betNum].type) != -1){
      point.html(_bets[betNum].point);
    } else if(['comeOdds', 'dontComeOdds'].indexOf(_bets[betNum].type) != -1){
      point.html(_bets[betNum].origBet.point);
    } else {
      point.html('');
    }
    
    var remove = $(document.createElement('td'));
    remove.append($(document.createElement('i')).attr('class', 'icon-remove icon-large').css({color:'#f00', cursor:'pointer'}))//.html('Rem');
    if(GameState.tutorial){
      remove.click(function(){
                     alert("You cannot take down a Tutorial bet.")
                   });
    }else if(_bets[betNum].type == 'passline'){
      if(GameState.point > 0){
        remove.click(function(){
                       alert("You cannot take down a Pass Line bet when a point is on.")
                     });
        remove.attr('disabled', 'true');
      }else{
        remove.click(function(){
                      _CRAPS.dealer.betManager.removeBet(_bets[betNum].bet.betId);
                      closeSingle();
                     });
      }
    }else if(_bets[betNum].type == 'dontPass'){
      if(GameState.point > 0){
        remove.click(function(){
                       alert("You cannot take down a Don\'t Pass bet when a point is on.")
                     });
        remove.attr('disabled', 'true');
      }else{
        remove.click(function(){
                      _CRAPS.dealer.betManager.removeBet(_bets[betNum].bet.betId);
                      closeSingle();
                     });
      }
    }else if(_bets[betNum].type == 'come'){
      if(_bets[betNum].point > 0){
        remove.click(function(){
                       alert("You cannot take down a Come bet when it has a point.");
                     });
        remove.attr('disabled', 'true');
      }else{
        remove.click(function(){
                      _CRAPS.dealer.betManager.removeBet(_bets[betNum].bet.betId);
                      closeSingle();
                     });
      }
    }else if(_bets[betNum].type == 'dontCome'){
        if(_bets[betNum].point > 0){
          remove.click(function(){
                        alert("You cannot take down a Don\'t Come bet when it has a point.");
                      });
          remove.attr('disabled', 'true');
        }else{
          remove.click(function(){
                        _CRAPS.dealer.betManager.removeBet(_bets[betNum].bet.betId);
                        closeSingle();
                      });
        }
    }else if(_bets[betNum].type == 'fire'){
      if(GameState.point > 0 || GameState.numFire > 0){
        remove.click(function(){
                      alert("You may only take down a fire bet on the inital Come Out Roll.");
                    });
        remove.attr('disabled', 'true');
      }else{
        remove.click(function(){
                      _CRAPS.dealer.betManager.removeBet(_bets[betNum].bet.betId);
                      closeSingle();
                    });
      }
    }else{
      remove.click(function(){
                    _CRAPS.dealer.betManager.removeBet(_bets[betNum].bet.betId);
                    closeSingle();
                   });
    }
    betTable.append(newBetRow);
    newBetRow.append(type);
    newBetRow.append(val);
    newBetRow.append(on);
    newBetRow.append(repeat);
    newBetRow.append(point);
    newBetRow.append(remove);
  }
}

function betValSlide(value){
  $('#betValue').attr('value', value);
}

function updateSlider(val){
  $('#betValSlide').attr('value', val);
}

$('#betValue').bind('keyup', function(e) {updateSlider(($('#betValue').val()?$('#betValue').val():0))});

$(window).bind('keyup',
  function(e) { var code = (e.keyCode ? e.keyCode : e.which);
    //console.log(code);
    if(code == 13) {
      if($('#betForm').css('visibility')!= 'hidden' && $('#betForm').css('display') != 'none'){
        create();
      }
    }
    if(code == 27) {
      if($('#betForm').css('visibility')!= 'hidden' && $('#betForm').css('display') != 'none'){
        cancel();
      }
      if(($('#modal').css('visibility')!= 'hidden' && $('#modal').css('display') != 'none') ||
         ($('#betListBG').css('visibility')!= 'hidden' && $('#betListBG').css('display') != 'none') ||
         ($('#betResultsBG').css('visibility')!= 'hidden' && $('#betResultsBG').css('display') != 'none')){
        closeModal();
      }
    }
    if(code == 32 || code == 82){
      if(($('#modal').css('visibility') == 'hidden' || $('#modal').css('display') == 'none') && ($('#betForm').css('visibility') == 'hidden' || $('#betForm').css('display') == 'none')){
        var active = $(document.activeElement);
        if(active[0] === $('#nameInput')[0]){
          return;
        }
        roll();
      }
    }
  }
);

function setUpBetForm(name){
  $('#betType').empty();
  var areaName = prettyToName(name);
  var prettyName = nameToPretty(areaName);
  var opt = $(document.createElement('option'));
  opt.attr('value', areaName);
  opt.html(prettyName);
  $('#betType').append(opt);
  $('#betName').html(prettyName);
  $('#betType').attr('disabled', 'true');
  updateBetDesc();
}

function addBet(area){
  preFireVal = $('#betValue').val();
  $('#betRepeat').removeAttr('disabled');
  $('#betRepeat').attr('checked', '');
  $('#betType').hide();
  $('#betName').show();
  $('#betValSlide').attr('min', '0');
  $('#betValSlide').attr('max', Math.min(_CRAPS.maxBet, PlayerManager.players[0].player.bank));
  $('#betValSlide').attr('step', '100');
  $('#betValSlide').attr('value', '100');
  $('#origBet').empty();
  
  if(GameState.tutorial){
    if(area.name == "Pass Line"){
      if((GameState.tutorialState == 0 && _CRAPS.dealer.betManager.bets.length == 0) ||
         (GameState.tutorialState == 3 && _CRAPS.dealer.betManager.bets.length == 1)){
        $('#betType').empty();
        var opt = $(document.createElement('option'));
        if(!GameState.point){
          opt.attr('value', 'passline');
          opt.html('Pass Line');
        } else {
          opt.attr('value', 'passlineOdds');
          opt.html('Pass Line Odds');
        }
        $('#betType').append(opt).attr('disabled', 'true');
        $('#betRepeat').attr('checked','');
        if($('#betType').val() == 'passlineOdds'){
          var origBet = $('#origBet');
          var origLabel = $(document.createElement('label'));
          var orig = $(document.createElement('input'));
          var bets = _CRAPS.dealer.betManager.bets;
          orig.attr('type', 'text');
          orig.css({width: '50px'});
          orig.attr('id', 'orig');
          var _type = $('#betType').val().slice(0, 8);
          for(i in bets){
            if(bets[i].type == _type){
              orig.attr('value', bets[i].bet.betId);
            }
          }
          origBet.append(origLabel).append(orig);
          origBet.hide();
          $('#betRepeat').removeAttr('checked');
          var origVal;
          for(i in _CRAPS.dealer.betManager.bets){
            if(_CRAPS.dealer.betManager.bets[i].type == 'passline'){
              origVal = _CRAPS.dealer.betManager.bets[i].bet.value;
            }
          }
          if(GameState.point == 4 || GameState.point == 10){
            $('#betValSlide').attr('step', '50');
            $('#betValSlide').attr('value', $('#betValue').attr('value'));
            $('#betValSlide').attr('max', origVal * 3);
          } else if(GameState.point == 5 || GameState.point == 9){
            $('#betValSlide').attr('step', '50');
            $('#betValSlide').attr('value', $('#betValue').attr('value'));
            $('#betValSlide').attr('max', origVal * 4);
          } else if(GameState.point == 6 || GameState.point == 8){
            $('#betValSlide').attr('step', '50');
            $('#betValSlide').attr('value', $('#betValue').attr('value'));
            $('#betValSlide').attr('max', origVal * 5);
          }
        }
        $('#betName').html(nameToPretty($('#betType').val()));
        updateBetDesc();
        place();
      }
    }
    return;
  }
  
  switch(area.name){
  case "Pass Line":
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    if(!GameState.point){
      opt.attr('value', 'passline');
      opt.html('Pass Line');
    } else {
      opt.attr('value', 'passlineOdds');
      opt.html('Pass Line Odds');
    }
    $('#betType').append(opt).attr('disabled', 'true');
    $('#betRepeat').attr('checked','');
    if($('#betType').val() == 'passlineOdds'){
      var origBet = $('#origBet');
      var origLabel = $(document.createElement('label'));
      var orig = $(document.createElement('input'));
      var bets = _CRAPS.dealer.betManager.bets;
      orig.attr('type', 'text');
      orig.css({width: '50px'});
      orig.attr('id', 'orig');
      var _type = $('#betType').val().slice(0, 8);
      for(i in bets){
        if(bets[i].type == _type){
          orig.attr('value', bets[i].bet.betId);
        }
      }
      origBet.append(origLabel).append(orig);
      origBet.hide();
      $('#betRepeat').removeAttr('checked');
      var origVal;
      for(i in _CRAPS.dealer.betManager.bets){
        if(_CRAPS.dealer.betManager.bets[i].type == 'passline'){
          origVal = _CRAPS.dealer.betManager.bets[i].bet.value;
        }
      }
      if(GameState.point == 4 || GameState.point == 10){
        $('#betValSlide').attr('step', '50');
        $('#betValSlide').attr('value', $('#betValue').attr('value'));
        $('#betValSlide').attr('max', origVal * 3);
      } else if(GameState.point == 5 || GameState.point == 9){
        $('#betValSlide').attr('step', '50');
        $('#betValSlide').attr('value', $('#betValue').attr('value'));
        $('#betValSlide').attr('max', origVal * 4);
      } else if(GameState.point == 6 || GameState.point == 8){
        $('#betValSlide').attr('step', '50');
        $('#betValSlide').attr('value', $('#betValue').attr('value'));
        $('#betValSlide').attr('max', origVal * 5);
      }
    }
    $('#betName').html(nameToPretty($('#betType').val()));
    updateBetDesc();
    break;
  case "Don't Pass":
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    if(!GameState.point){
      opt.attr('value', 'dontPass');
      opt.html('Don\'t Pass Line');
    } else {
      opt.attr('value', 'dontPassOdds');
      opt.html('Don\'t Pass Odds');
    }
    $('#betType').append(opt).attr('disabled', 'true');
    $('#betRepeat').attr('checked','');
    if($('#betType').val() == 'dontPassOdds'){
      var origBet = $('#origBet');
      var origLabel = $(document.createElement('label'));
      var orig = $(document.createElement('input'));
      var bets = _CRAPS.dealer.betManager.bets;
      orig.attr('type', 'text');
      orig.css({width: '50px'});
      orig.attr('id', 'orig');
      var _type = $('#betType').val().slice(0, 8);
      for(i in bets){
        if(bets[i].type == _type){
          orig.attr('value', bets[i].bet.betId);
        }
      }
      origBet.append(origLabel).append(orig);
      origBet.hide();
      $('#betRepeat').removeAttr('checked');
      var origVal;
      for(i in _CRAPS.dealer.betManager.bets){
        if(_CRAPS.dealer.betManager.bets[i].type == 'dontPass'){
          origVal = _CRAPS.dealer.betManager.bets[i].bet.value;
        }
      }
      if(GameState.point == 4 || GameState.point == 10){
        $('#betValSlide').attr('step', '50');
        $('#betValSlide').attr('value', $('#betValue').attr('value'));
        $('#betValSlide').attr('max', origVal * 6);
      } else if(GameState.point == 5 || GameState.point == 9){
        $('#betValSlide').attr('step', '30');
        $('#betValSlide').attr('value', $('#betValue').attr('value'));
        $('#betValSlide').attr('max', origVal * 8);
      } else if(GameState.point == 6 || GameState.point == 8){
        $('#betValSlide').attr('step', '60');
        $('#betValSlide').attr('value', $('#betValue').attr('value'));
        $('#betValSlide').attr('max', origVal * 10);
      }
    }
    $('#betName').html(nameToPretty($('#betType').val()));
    updateBetDesc();
    break;
  case "ComeOdds4":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'come' && _bets[bet].point == 4){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'comeOdds');
    opt.html('Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('max', Math.min((origVal * 3), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "ComeOdds5":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'come' && _bets[bet].point == 5){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'comeOdds');
    opt.html('Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('max', Math.min((origVal * 4), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "ComeOdds6":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'come' && _bets[bet].point == 6){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'comeOdds');
    opt.html('Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('max', Math.min((origVal * 5), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "ComeOdds8":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'come' && _bets[bet].point == 8){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'comeOdds');
    opt.html('Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('max', Math.min((origVal * 5), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "ComeOdds9":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'come' && _bets[bet].point == 9){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'comeOdds');
    opt.html('Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('max', Math.min((origVal * 4), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "ComeOdds10":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'come' && _bets[bet].point == 10){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'comeOdds');
    opt.html('Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('max', Math.min((origVal * 3), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "DontComeOdds4":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'dontCome' && _bets[bet].point == 4){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'dontComeOdds');
    opt.html('Don\'t Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('max', Math.min((origVal * 6), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "DontComeOdds5":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'dontCome' && _bets[bet].point == 5){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'dontComeOdds');
    opt.html('Don\'t Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '30');
    $('#betValSlide').attr('max', Math.min((origVal * 8), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "DontComeOdds6":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'dontCome' && _bets[bet].point == 6){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'dontComeOdds');
    opt.html('Don\'t Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '60');
    $('#betValSlide').attr('max', Math.min((origVal * 10), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "DontComeOdds8":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'dontCome' && _bets[bet].point == 8){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'dontComeOdds');
    opt.html('Don\'t Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '60');
    $('#betValSlide').attr('max', Math.min((origVal * 10), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "DontComeOdds9":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'dontCome' && _bets[bet].point == 9){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'dontComeOdds');
    opt.html('Don\'t Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '30');
    $('#betValSlide').attr('max', Math.min((origVal * 8), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "DontComeOdds10":
    var _bets = _CRAPS.dealer.betManager.bets
    var exists = false;
    var id = false;
    for(bet in _bets){
      if(_bets[bet].type == 'dontCome' && _bets[bet].point == 10){
        exists = bet;
      }
    }
    if(!exists){
      return false;
    }
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'dontComeOdds');
    opt.html('Don\'t Come Line Odds');
    var origBet = $('#origBet');
    var origLabel = $(document.createElement('label'));
    var orig = $(document.createElement('input'));
    orig.attr('type', 'text');
    orig.css({width: '50px'});
    orig.attr('id', 'orig');
    origLabel.html('Original Bet ID: ');
    origBet.append(origLabel).append(orig);
    orig.attr('value', _bets[exists].bet.betId);
    origVal = _CRAPS.dealer.betManager.bets[exists].bet.value;
    $('#betRepeat').removeAttr('checked');
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('max', Math.min((origVal * 6), PlayerManager.players[0].player.bank));
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betType').append(opt);
    $('#betName').html(nameToPretty($('#betType').val()));
    origBet.hide();
    updateBetDesc();
    break;
  case "Place 6":
    setUpBetForm(area.name);
    $('#betValSlide').attr('step', '60');
    $('#betValSlide').attr('value', '120');
    break;
  case "Place 8":
    setUpBetForm(area.name);
    $('#betValSlide').attr('step', '60');
    $('#betValSlide').attr('value', '120');
    break;
  case "C and E":
    setUpBetForm(area.name);
    $('#betValSlide').attr('step', '20');
    $('#betValSlide').attr('value', '200');
    break;
  case "Seven":
    setUpBetForm(area.name)
    $('#betValSlide').attr('step', '30');
    $('#betValSlide').attr('value', '300');
    break;
  case "Horn":
    setUpBetForm(area.name);
    $('#betValSlide').attr('step', '40');
    $('#betValSlide').attr('value', '400');
    break;
  case "World":
    setUpBetForm(area.name);
    $('#betValSlide').attr('step', '50');
    $('#betValSlide').attr('value', '500');
    break;
  case "Fire":
    $('#betType').empty();
    var opt = $(document.createElement('option'));
    opt.attr('value', 'fire');
    opt.html(area.name);
    $('#betType').append(opt);
    $('#betName').html('Fire');
    $('#betType').attr('disabled', 'true');
    $('#betValSlide').attr('step', '1');
    $('#betValSlide').attr('max', '10');
    if(parseInt($('#betValue').attr('value')) > 10){
      $('#betValue').attr('value', '5');
    }
    $('#betValSlide').attr('value', $('#betValue').attr('value'));
    $('#betRepeat').removeAttr('checked');
    updateBetDesc();
    break;
  default:
    setUpBetForm(area.name);
  }
  
  place();
}

function place(){
  $('#betInfo').width($('#board').width() * (1/4));
  $('#betForm').show();
  $('#betForm').height($('#betInfo').height() + 8 + 4);
  $('#betForm').width($('#betInfo').width() + 8 + 4);
  //$('#betForm').animate({left: ($('#board').offset().left + $('#board').width() - $('#betForm').width() - (parseInt($('#betForm').css('padding')) * 2 + parseInt($('#betForm').css('margin')) * 2)), opacity: 1}, 1000);
  $('#betForm').animate({left: ($('#board').offset().left + $('#board').width() - $('#betForm').width() - (4 * 2 + 2 * 2)), opacity: 1}, BET_FORM_FADE_OUT);
}

function create(){
  var origBet = null;
  if(['passlineOdds', 'comeOdds', 'dontPassOdds', 'dontComeOdds'].indexOf($('#betType').val()) != -1){
    origBet = _CRAPS.dealer.betManager.getBetById($('#orig').val());
    if(!_CRAPS.dealer.betManager.getBetById($('#orig').val())){
      alert('You may not place a ' + nameToPretty($('#betType').val()) + ' Bet when there is no ' + nameToPretty($('#betType').val().slice(0,-4)) + ' Bet on the table.');
      cancel();
      return;
    }
  }
  var newBet = p.createBet($('#betType').val(), parseInt($('#betValue').val()), $('#betRepeat').is(':checked'), origBet);
  _CRAPS.placeBet(newBet);
  PlayerManager.updatePlayerArea();
  _CRAPS.dealer.betManager.displayBets();
  $('#betForm').animate({left: ($('#board').offset().left + $('#board').width() + 2), opacity: 0}, BET_FORM_FADE_OUT, function(){$('#betForm').hide();});
  if(GameState.tutorial){
    updateTutorial();
  }
  if($('#betType').val() == 'fire'){
    $('#betValue').val(preFireVal);
  }
  draw(Board);
}

function cancel(){
  $('#betForm').animate({left: ($('#board').offset().left + $('#board').width() + 2), opacity: 0}, BET_FORM_FADE_OUT, function(){$('#betForm').hide();});
  PlayerManager.updatePlayerArea();
  _CRAPS.dealer.betManager.displayBets();
  if($('#betType').val() == 'fire'){
    $('#betValue').val(preFireVal);
  }
}

function updateBet(idNum){
  var _betDisp = $('#bet' + idNum);
  var _betDispVal = $('#val' + idNum);
  var _bet = _CRAPS.dealer.betManager.getBetById(idNum);
  
  var oldVal = _bet.bet.value;
  //console.log(oldVal);
  
  _betDispVal.empty();
  var input = $(document.createElement('input'));
  input.attr('type', 'number');
  //input.attr('id', 'nameInput');
  input.css({width: $('#val' + idNum).width()});
  input.attr('value', oldVal);
  input.focus(function(){
    input.select();
  });
  input.change(function(){
    var _betDispVal = $('#val' + idNum);
    var _bet = _CRAPS.dealer.betManager.getBetById(idNum);
    var oldVal = _bet.bet.value;
    var newAmount = input.val();
    var retArray = revalidate(_bet, newAmount);
    if(!retArray[0]){
      retArray[1]();
      return;
    }
    if(retArray[0] == 3){
      _betDispVal.empty();
      _betDispVal.html('$' + oldVal);
      retArray[1]();
      return;
    } else {
      _betDispVal.empty();
      _betDispVal.html('$' + newAmount);
    _betDispVal.attr('class', 'clickable');
      _bet.bet.value = parseInt(newAmount);
      var diff = (parseInt(newAmount) - parseInt(oldVal));
      PlayerManager.getPlayerById(_bet.bet.playerId).player.subFromBank(diff);
    }
    PlayerManager.updatePlayerArea();
    if(retArray[0] == 2){
      retArray[1]();
    }
  });
  input.blur(function(){
    var _betDispVal = $('#val' + idNum);
    var _bet = _CRAPS.dealer.betManager.getBetById(idNum);
    var oldVal = _bet.bet.value;
    var newAmount = input.val();
    var retArray = revalidate(_bet, newAmount);
    if(!retArray[0]){
      retArray[1]();
      return;
    }
    _betDispVal.empty();
    _betDispVal.html('$' + newAmount);
    _betDispVal.attr('class', 'clickable');
    _bet.bet.value = parseInt(newAmount);
    var diff = (parseInt(newAmount) - parseInt(oldVal));
    PlayerManager.getPlayerById(_bet.bet.playerId).player.subFromBank(diff);
    PlayerManager.updatePlayerArea();
    if(retArray[0] == 2){
      retArray[1]();
    }
  });
  _betDispVal.append(input);
  input.focus();
}

function updateSingleBet(idNum){
  var _betDisp = $('#betSingle' + idNum);
  var _betDispVal = $('#valSingle' + idNum);
  var _bet = _CRAPS.dealer.betManager.getBetById(idNum);
  
  var oldVal = _bet.bet.value;
  //console.log(oldVal);
  
  _betDispVal.empty();
  var input = $(document.createElement('input'));
  input.attr('type', 'number');
  //input.attr('id', 'nameInput');
  input.css({width: $('#valSingle' + idNum).width()});
  input.attr('value', oldVal);
  input.focus(function(){
    input.select();
  });
  input.change(function(){
    var _betDispVal = $('#valSingle' + idNum);
    var _bet = _CRAPS.dealer.betManager.getBetById(idNum);
    var oldVal = _bet.bet.value;
    var newAmount = input.val();
    var retArray = revalidate(_bet, newAmount);
    if(!retArray[0]){
      retArray[1]();
      return;
    }
    if(retArray[0] == 3){
      _betDispVal.empty();
      _betDispVal.html('$' + oldVal);
      retArray[1]();
      return;
    } else {
      _betDispVal.empty();
      _betDispVal.html('$' + newAmount);
    _betDispVal.attr('class', 'clickable');
      _bet.bet.value = parseInt(newAmount);
      var diff = (parseInt(newAmount) - parseInt(oldVal));
      PlayerManager.getPlayerById(_bet.bet.playerId).player.subFromBank(diff);
    }
    PlayerManager.updatePlayerArea();
    if(retArray[0] == 2){
      retArray[1]();
    }
  });
  input.blur(function(){
    var _betDispVal = $('#valSingle' + idNum);
    var _bet = _CRAPS.dealer.betManager.getBetById(idNum);
    var oldVal = _bet.bet.value;
    var newAmount = input.val();
    var retArray = revalidate(_bet, newAmount);
    if(!retArray[0]){
      retArray[1]();
      return;
    }
    _betDispVal.empty();
    _betDispVal.html('$' + newAmount);
    _betDispVal.attr('class', 'clickable');
    _bet.bet.value = parseInt(newAmount);
    var diff = (parseInt(newAmount) - parseInt(oldVal));
    PlayerManager.getPlayerById(_bet.bet.playerId).player.subFromBank(diff);
    PlayerManager.updatePlayerArea();
    if(retArray[0] == 2){
      retArray[1]();
    }
  });
  _betDispVal.append(input);
  input.focus();
}