import React, { useState } from 'react';
import challenges from '../data/challenges';

const ScoreBoard = () => {
  const pointValues = [10, 20, 30, 40, 50];

  const [players, setPlayers] = useState([
    { name: '동요', scores: [false, false, false, false, false] },
    { name: '클래식', scores: [false, false, false, false, false] },
    { name: '1999년 노래', scores: [false, false, false, false, false] },
    { name: '2000년대 노래', scores: [false, false, false, false, false] },
    { name: '음악', scores: [false, false, false, false, false] }
  ]);

  // 미션 모달 상태
  const [modal, setModal] = useState({
    isOpen: false,
    challenge: '',
    player: '',
    points: 0
  });

  // 확인 모달 상태
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    playerIndex: null,
    scoreIndex: null,
    challengeText: ''
  });

  // 칸 클릭 → 확인 모달 띄우기
  const openConfirmModal = (playerIndex, scoreIndex) => {
    if (players[playerIndex].scores[scoreIndex]) return; // 이미 완료된 미션이면 아무 일도 없음
  
    const playerName = players[playerIndex].name;
    const points = pointValues[scoreIndex];
    const challengeText = challenges[playerName][points];
  
    setConfirmModal({
      isOpen: true,
      playerIndex,
      scoreIndex,
      challengeText
    });
  };
  

  // 확인 모달 "네" → 점수 반영 및 미션 모달 열기
  const confirmSelection = () => {
    const { playerIndex, scoreIndex } = confirmModal;
    const newPlayers = [...players];
    newPlayers[playerIndex].scores[scoreIndex] = !newPlayers[playerIndex].scores[scoreIndex];
    setPlayers(newPlayers);

    const playerName = players[playerIndex].name;
    const points = pointValues[scoreIndex];

    setModal({
      isOpen: true,
      challenge: challenges[playerName][points],
      player: playerName,
      points
    });

    // 확인 모달 닫기
    setConfirmModal({
      isOpen: false,
      playerIndex: null,
      scoreIndex: null,
      challengeText: ''
    });
  };

  // 확인 모달 "아니요"
  const cancelSelection = () => {
    setConfirmModal({
      isOpen: false,
      playerIndex: null,
      scoreIndex: null,
      challengeText: ''
    });
  };

  // 미션 모달 닫기
  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  return (
    <div className="scoreboard">
      <h1 className="title">신서유기 점수판</h1>

      <table className="score-table">
        <thead>
          <tr>
            <th></th>
            {pointValues.map((points, index) => (
              <th key={index}>{points}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, playerIndex) => (
            <tr key={playerIndex}>
              <td>{player.name}</td>
              {player.scores.map((isScored, scoreIndex) => (
                <td
                  key={scoreIndex}
                  className={isScored ? 'scored' : 'not-scored'}
                  onClick={() => openConfirmModal(playerIndex, scoreIndex)}
                >
                  {isScored ? '✓' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="info-box">
        <h2>게임 안내</h2>
        <ul>
          <li>칸을 클릭하면 제시어가 나오고, 확인 후 점수를 기록할 수 있어요.</li>
          <li>완료한 칸은 분홍색으로 표시됩니다.</li>
        </ul>
      </div>

      {/* 미션 모달 */}
      {modal.isOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>{modal.player} - {modal.points}점 미션</h3>
              <button onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <p>{modal.challenge}</p>
            </div>
            <button className="modal-close" onClick={closeModal}>확인</button>
          </div>
        </div>
      )}

      {/* 확인 모달 */}
      {confirmModal.isOpen && (
  <div className="modal-backdrop">
    <div className="modal">
      <div className="modal-header">
        <h3>정말 하시겠습니까?</h3>
      </div>
      <div className="modal-actions">
        <button className="btn confirm" onClick={confirmSelection}>예</button>
        <button className="btn cancel" onClick={cancelSelection}>아니요</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ScoreBoard;
