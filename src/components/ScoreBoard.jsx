// ✅ ScoreBoard.jsx - 2개씩 칸 구성으로 업데이트
import React, { useState } from 'react';
import challenges from '../data/challenges';
import '../style.css';

const ScoreBoard = () => {
  const pointValues = [10, 20, 30, 40, 50];

  // 각 점수마다 2개의 문제로 구성
  const [players, setPlayers] = useState([
    { name: '조 퀴즈', scores: Array(10).fill(false) },
    { name: 'KPOP 가사 퀴즈', scores: Array(10).fill(false) },
    { name: '팝송 가사 퀴즈', scores: Array(10).fill(false) },
    { name: '노래 듣고 맞추기 퀴즈', scores: Array(10).fill(false) },
    { name: '외국 영화 명대사 퀴즈', scores: Array(10).fill(false) },
    { name: '한국 영화 명대사 퀴즈', scores: Array(10).fill(false) },
    { name: '가위바위보', scores: Array(10).fill(false) },
    { name: '인물 퀴즈', scores: Array(10).fill(false) },
    { name: '한국 상식 퀴즈', scores: Array(10).fill(false) },
    { name: '세계 문화 퀴즈', scores: Array(10).fill(false) },
    { name: '수도 퀴즈', scores: Array(10).fill(false) },
    { name: '국기 퀴즈', scores: Array(10).fill(false) },
  ]);

  const [modal, setModal] = useState({ isOpen: false, challenge: '', player: '', points: 0 });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, playerIndex: null, scoreIndex: null, challengeText: '' });

  const openConfirmModal = (playerIndex, scoreIndex) => {
    if (players[playerIndex].scores[scoreIndex]) return;

    const playerName = players[playerIndex].name;
    const points = pointValues[Math.floor(scoreIndex / 2)];
    const challengeText = challenges[playerName][points];

    setConfirmModal({ isOpen: true, playerIndex, scoreIndex, challengeText });
  };

  const confirmSelection = () => {
    const { playerIndex, scoreIndex } = confirmModal;
    const newPlayers = [...players];
    newPlayers[playerIndex].scores[scoreIndex] = true;
    setPlayers(newPlayers);

    const playerName = players[playerIndex].name;
    const points = pointValues[Math.floor(scoreIndex / 2)];

    setModal({ isOpen: true, challenge: challenges[playerName][points], player: playerName, points });

    setConfirmModal({ isOpen: false, playerIndex: null, scoreIndex: null, challengeText: '' });
  };

  const cancelSelection = () => {
    setConfirmModal({ isOpen: false, playerIndex: null, scoreIndex: null, challengeText: '' });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  return (
    <div className="scoreboard-full">
      <div className="scoreboard-box">
        <h1 className="title">신서유기 점수판</h1>
        <table className="score-table">
          <thead>
            <tr>
              <th></th>
              {pointValues.map((points, i) => (
                <React.Fragment key={i}>
                  <th>{points}점</th>
                  <th></th>
                </React.Fragment>
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
                    {isScored ? '✓' : `Q${(scoreIndex % 2) + 1}`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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