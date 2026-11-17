import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface FoodItem {
  display: string;
  reading: string;
}

// 食事できる食品メニュー 100種類
const FOOD_LIST: FoodItem[] = [
  { display: 'チーズカレー', reading: 'ちーずかれー' },
  { display: '牛丼', reading: 'ぎゅうどん' },
  { display: 'カルボナーラ', reading: 'かるぼなーら' },
  { display: 'トマトシチュー', reading: 'とまとしちゅー' },
  { display: '生姜焼き肉定食', reading: 'しょうがやきにくていしょく' },
  { display: 'オムライス', reading: 'おむらいす' },
  { display: 'ハンバーグ定食', reading: 'はんばーぐていしょく' },
  { display: '味噌ラーメン', reading: 'みそらーめん' },
  { display: '醤油ラーメン', reading: 'しょうゆらーめん' },
  { display: '豚骨ラーメン', reading: 'とんこつらーめん' },
  { display: '親子丼', reading: 'おやこどん' },
  { display: 'カツ丼', reading: 'かつどん' },
  { display: '海鮮丼', reading: 'かいせんどん' },
  { display: '天丼', reading: 'てんどん' },
  { display: 'うな重', reading: 'うなじゅう' },
  { display: 'ペペロンチーノ', reading: 'ぺぺろんちーの' },
  { display: 'ミートソース', reading: 'みーとそーす' },
  { display: 'ナポリタン', reading: 'なぽりたん' },
  { display: 'マルゲリータピザ', reading: 'まるげりーたぴざ' },
  { display: 'ビーフシチュー', reading: 'びーふしちゅー' },
  { display: 'クリームシチュー', reading: 'くりーむしちゅー' },
  { display: '唐揚げ定食', reading: 'からあげていしょく' },
  { display: 'とんかつ定食', reading: 'とんかつていしょく' },
  { display: 'チキン南蛮', reading: 'ちきんなんばん' },
  { display: 'サバの味噌煮', reading: 'さばのみそに' },
  { display: '焼き餃子', reading: 'やきぎょうざ' },
  { display: 'チャーハン', reading: 'ちゃーはん' },
  { display: '麻婆豆腐', reading: 'まーぼーどうふ' },
  { display: 'エビチリ', reading: 'えびちり' },
  { display: '青椒肉絲', reading: 'ちんじゃおろーす' },
  { display: '回鍋肉', reading: 'ほいこーろー' },
  { display: '天津飯', reading: 'てんしんはん' },
  { display: 'お好み焼き', reading: 'おこのみやき' },
  { display: 'たこ焼き', reading: 'たこやき' },
  { display: '焼きそば', reading: 'やきそば' },
  { display: 'きつねうどん', reading: 'きつねうどん' },
  { display: 'カレーうどん', reading: 'かれーうどん' },
  { display: 'ざるそば', reading: 'ざるそば' },
  { display: '天ぷらそば', reading: 'てんぷらそば' },
  { display: '冷やし中華', reading: 'ひやしちゅうか' },
  { display: 'ロールキャベツ', reading: 'ろーるきゃべつ' },
  { display: 'グラタン', reading: 'ぐらたん' },
  { display: 'ドリア', reading: 'どりあ' },
  { display: 'ハヤシライス', reading: 'はやしらいす' },
  { display: 'タコライス', reading: 'たこらいす' },
  { display: 'ロコモコ丼', reading: 'ろこもこどん' },
  { display: 'ガパオライス', reading: 'がぱおらいす' },
  { display: 'グリーンカレー', reading: 'ぐりーんかれー' },
  { display: 'ナンとカレー', reading: 'なんとかれー' },
  { display: 'ビビンバ', reading: 'びびんば' },
  { display: 'スンドゥブチゲ', reading: 'すんどぅぶちげ' },
  { display: 'サムギョプサル', reading: 'さむぎょぷさる' },
  { display: 'チーズタッカルビ', reading: 'ちーずたっかるび' },
  { display: '冷麺', reading: 'れいめん' },
  { display: 'すき焼き', reading: 'すきやき' },
  { display: 'しゃぶしゃぶ', reading: 'しゃぶしゃぶ' },
  { display: 'もつ鍋', reading: 'もつなべ' },
  { display: 'キムチ鍋', reading: 'きむちなべ' },
  { display: 'おでん', reading: 'おでん' },
  { display: '肉じゃが', reading: 'にくじゃが' },
  { display: 'コロッケ', reading: 'ころっけ' },
  { display: 'メンチカツ', reading: 'めんちかつ' },
  { display: 'エビフライ', reading: 'えびふらい' },
  { display: 'アジフライ', reading: 'あじふらい' },
  { display: 'カキフライ', reading: 'かきふらい' },
  { display: 'サーモン寿司', reading: 'さーもんずし' },
  { display: 'まぐろの握り', reading: 'まぐろのにぎり' },
  { display: 'いくら軍艦', reading: 'いくらぐんかん' },
  { display: '鉄火巻き', reading: 'てっかまき' },
  { display: 'いなり寿司', reading: 'いなりずし' },
  { display: 'ちらし寿司', reading: 'ちらしずし' },
  { display: '手巻き寿司', reading: 'てまきずし' },
  { display: '鮭おにぎり', reading: 'さけおにぎり' },
  { display: '梅おにぎり', reading: 'うめおにぎり' },
  { display: 'ツナマヨおにぎり', reading: 'つなまよおにぎり' },
  { display: 'たまごサンド', reading: 'たまごさんど' },
  { display: 'カツサンド', reading: 'かつさんど' },
  { display: 'ハンバーガー', reading: 'はんばーがー' },
  { display: 'チーズバーガー', reading: 'ちーずばーがー' },
  { display: 'ホットドッグ', reading: 'ほっとどっぐ' },
  { display: 'フレンチトースト', reading: 'ふれんちとーすと' },
  { display: 'パンケーキ', reading: 'ぱんけーき' },
  { display: 'クロワッサン', reading: 'くろわっさん' },
  { display: 'カレーパン', reading: 'かれーぱん' },
  { display: 'メロンパン', reading: 'めろんぱん' },
  { display: '焼き芋', reading: 'やきいも' },
  { display: '茶碗蒸し', reading: 'ちゃわんむし' },
  { display: 'だし巻き卵', reading: 'だしまきたまご' },
  { display: 'ポトフ', reading: 'ぽとふ' },
  { display: 'ミネストローネ', reading: 'みねすとろーね' },
  { display: 'コーンスープ', reading: 'こーんすーぷ' },
  { display: 'シーザーサラダ', reading: 'しーざーさらだ' },
  { display: 'ポテトサラダ', reading: 'ぽてとさらだ' },
  { display: 'フライドポテト', reading: 'ふらいどぽてと' },
  { display: 'ステーキ', reading: 'すてーき' },
  { display: 'ローストビーフ', reading: 'ろーすとびーふ' },
  { display: 'スペアリブ', reading: 'すぺありぶ' },
  { display: 'パエリア', reading: 'ぱえりあ' },
  { display: 'アクアパッツァ', reading: 'あくあぱっつぁ' },
  { display: 'フォー', reading: 'ふぉー' },
];

type GameState = 'start' | 'playing' | 'result';

// カタカナをひらがなに正規化し、空白を除去する関数
const normalizeKana = (str: string): string => {
  return str
    .trim()
    .replace(/\s+/g, '')
    .replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<FoodItem>(FOOD_LIST[0]);
  const [inputValue, setInputValue] = useState<string>('');
  const [clearedWords, setClearedWords] = useState<FoodItem[]>([]);
  const [isCorrectFlash, setIsCorrectFlash] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // ランダムに次の問題を選ぶ（直前と同じ問題を避ける）
  const pickNextWord = (prevWord?: FoodItem) => {
    let next = FOOD_LIST[Math.floor(Math.random() * FOOD_LIST.length)];
    if (prevWord && FOOD_LIST.length > 1) {
      while (next.display === prevWord.display) {
        next = FOOD_LIST[Math.floor(Math.random() * FOOD_LIST.length)];
      }
    }
    setCurrentWord(next);
  };

  // ゲーム開始処理
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setInputValue('');
    setClearedWords([]);
    pickNextWord();
    setGameState('playing');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // 60秒カウントダウンタイマー
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 正解判定ロジック（未確定文字・確定文字どちらもリアルタイム判定）
  const checkAnswer = (rawVal: string) => {
    const normalizedInput = normalizeKana(rawVal);
    const targetReading = normalizeKana(currentWord.reading);
    const targetDisplay = normalizeKana(currentWord.display);

    // ひらがな一致、または漢字・カタカナ変換後の完全一致でクリア
    if (normalizedInput === targetReading || normalizedInput === targetDisplay) {
      setScore((prev) => prev + 10);
      setClearedWords((prev) => [currentWord, ...prev]);
      setIsCorrectFlash(true);
      setTimeout(() => setIsCorrectFlash(false), 180);

      // 入力欄をクリアして次の問題へ
      setInputValue('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      pickNextWord(currentWord);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    checkAnswer(val);
  };

  // パス（スキップ）機能
  const handleSkip = () => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    pickNextWord(currentWord);
  };

  return (
    <div className="game-container">
      <div className="card">
        {gameState === 'start' && (
          <>
            <span className="title-badge">グルメ・フリック検定</span>
            <h1 className="game-title">もぐもぐフリック<br />100本ノック！</h1>
            <div className="rule-box">
              <ul>
                <li>制限時間は <strong>60秒</strong>！</li>
                <li>美味しいメニューが全 <strong>100種類</strong> からランダム出題</li>
                <li>ひらがな入力で完成すると <strong>10点</strong> 加点</li>
                <li>変換キーを押さなくても一致した瞬間に次へ進みます</li>
              </ul>
            </div>
            <button className="btn" onClick={startGame}>
              ゲームスタート！
            </button>
          </>
        )}

        {gameState === 'playing' && (
          <>
            <div className="status-bar">
              <div className="status-item">
                <span className="status-label">のこり時間</span>
                <span className={`status-value ${timeLeft <= 10 ? 'warning' : ''}`}>
                  {timeLeft}秒
                </span>
              </div>
              <div className="status-item">
                <span className="status-label">スコア</span>
                <span className="status-value">{score}点</span>
              </div>
            </div>

            <div className="question-area">
              <div className="reading-text">{currentWord.reading}</div>
              <div className="word-text">{currentWord.display}</div>
            </div>

            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className={`flick-input ${isCorrectFlash ? 'correct-flash' : ''}`}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="ここに入力..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>

            <p className="hint-text">※スマホのフリック入力でひらがなを打ってください</p>

            <button className="btn btn-secondary" onClick={handleSkip}>
              このお題をパスする
            </button>
          </>
        )}

        {gameState === 'result' && (
          <>
            <span className="title-badge">タイムアップ！</span>
            <h2 className="game-title">結果発表</h2>
            <div className="result-score-box">
              <div className="result-score">{score}点</div>
              <div className="result-sub">
                クリア数：{clearedWords.length} 品
              </div>
            </div>

            {clearedWords.length > 0 && (
              <div className="history-list">
                {clearedWords.map((item, idx) => (
                  <p key={idx}>
                    ✅ {item.display}（{item.reading}） +10点
                  </p>
                ))}
              </div>
            )}

            <button className="btn" onClick={startGame}>
              もういちど挑戦する
            </button>
          </>
        )}
      </div>
    </div>
  );
}