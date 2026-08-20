import './RulebookContent.css'

/**
 * 룰북 본문. RulebookModal 안에서 표시된다.
 * 실제 카드 색을 정확히 보여줘야 하므로 앱의 파스텔 UI 톤과는 별개로 원색 팔레트를 사용한다.
 */
export default function RulebookContent() {
  return (
    <div className="rb">
      <div className="rb-header">
        <div className="rb-header__brand">
          <div className="rb-header__logo">
            WoNsO<span className="rb-header__logo-accent">원-소</span>
          </div>
          <div className="rb-header__tagline">
            "주기율표의 규칙을 지배하고, 가장 먼저 손을 비우는 자가 승리한다!"
          </div>
        </div>
        <div className="rb-header__badges">
          <div className="rb-badge">
            <span className="rb-badge__num">2~6</span>
            <span className="rb-badge__lbl">인원 (최대10)</span>
          </div>
          <div className="rb-badge">
            <span className="rb-badge__num">15~25</span>
            <span className="rb-badge__lbl">분 소요</span>
          </div>
          <div className="rb-badge">
            <span className="rb-badge__num">3R</span>
            <span className="rb-badge__lbl">최저 점수 승리</span>
          </div>
        </div>
      </div>

      <section className="rb-section" id="rb-compose">
        <h3 className="rb-section__title">
          <span className="rb-dot" style={{ background: '#455a64' }}>①</span>
          카드 구성 (총 109장)
        </h3>
        <div className="rb-legend">
          <div className="rb-legend__group">
            <div className="rb-legend__label">색상 = 족(Group)</div>
            <div className="rb-swatch-row">
              <span className="rb-swatch" style={{ background: '#e53935' }} />빨강 1족
              <span className="rb-swatch" style={{ background: '#fb8c00' }} />주황 2족
              <span className="rb-swatch" style={{ background: '#fdd835' }} />노랑 13족
            </div>
            <div className="rb-swatch-row">
              <span className="rb-swatch" style={{ background: '#43a047' }} />초록 14족
              <span className="rb-swatch" style={{ background: '#1e88e5' }} />파랑 15족
              <span className="rb-swatch" style={{ background: '#8e24aa' }} />보라 16족
            </div>
            <div className="rb-swatch-row">
              <span className="rb-swatch" style={{ background: '#ec407a' }} />분홍 17족
              <span className="rb-swatch" style={{ background: '#9e9e9e' }} />회색 18족
              <span className="rb-swatch" style={{ background: '#26a69a' }} />민트 전이금속
            </div>
          </div>
          <div className="rb-legend__shape">
            <div className="rb-legend__label">도형 = 주기(Period)</div>
            <div className="rb-shape-row">❤️ 하트 — 2주기</div>
            <div className="rb-shape-row">🔺 삼각형 — 3주기</div>
            <div className="rb-shape-row">⬛ 사각형 — 4주기</div>
            <div className="rb-shape-row">⭐ 별(융합) — 1·5·6주기</div>
          </div>
        </div>
        <div className="rb-note">
          <b>⚡ 흰색 특수카드(22장)</b> — 색상·도형과 무관하게 언제든 낼 수 있는 액션 카드
        </div>
      </section>

      <div className="rb-cols" id="rb-prep">
        <section className="rb-section">
          <h3 className="rb-section__title">
            <span className="rb-dot" style={{ background: '#5d4037' }}>②</span>
            게임 준비
          </h3>
          <ol className="rb-steps">
            <li>
              <span className="rb-steps__n">1</span>카드를 잘 섞어 <b>7장씩</b> 나눠 갖습니다.
            </li>
            <li>
              <span className="rb-steps__n">2</span>남은 카드는 중앙에 쌓아 <b>뽑기 더미</b>로 둡니다.
            </li>
            <li>
              <span className="rb-steps__n">3</span>맨 위 1장을 뒤집어 <b>버리기 더미</b>를 만듭니다.
            </li>
            <li>
              <span className="rb-steps__n">4</span>딜러 왼쪽 사람부터 시계 방향으로 시작!
            </li>
          </ol>
        </section>
        <section className="rb-section">
          <h3 className="rb-section__title">
            <span className="rb-dot" style={{ background: '#00695c' }}>③</span>
            카드 못 낼 때
          </h3>
          <div className="rb-warn">
            <b>낼 카드가 없다면?</b> 뽑기 더미에서 강제로 1장을 뽑습니다. 방금 뽑은 카드를 즉시 낼 수
            있다면 바로 낼 수 있어요.
          </div>
        </section>
      </div>

      <section className="rb-section" id="rb-play">
        <h3 className="rb-section__title">
          <span className="rb-dot" style={{ background: '#c62828' }}>④</span>
          카드 내는 법 — 3가지 조건 중 1개!
        </h3>
        <div className="rb-cond-grid">
          <div className="rb-cond rb-cond--1">
            <span className="rb-cond__num">조건 1</span>
            <b>같은 색상 (족)</b>
            바닥 카드와 색이 같으면 도형 상관없이 낼 수 있습니다.
          </div>
          <div className="rb-cond rb-cond--2">
            <span className="rb-cond__num">조건 2</span>
            <b>같은 도형 (주기)</b>
            바닥 카드와 도형이 같으면 색상 상관없이 낼 수 있습니다.
          </div>
          <div className="rb-cond rb-cond--3">
            <span className="rb-cond__num">조건 3</span>
            <b>⚡ 흰색 특수카드</b>
            바닥 상태와 무관하게 언제든 낼 수 있습니다.
          </div>
        </div>
        <div className="rb-speak">
          💬 <b>원소 이름 말하기</b> — 카드를 낼 때는 원소 기호의 이름을 함께 이야기해야 합니다. 말하지
          않으면 <b>패널티 점수</b>를 받습니다!
        </div>
      </section>

      <section className="rb-section" id="rb-action">
        <h3 className="rb-section__title">
          <span className="rb-dot" style={{ background: '#6a1b9a' }}>⑤</span>
          특수 액션 카드 (⚡)
        </h3>
        <div className="rb-table-wrap">
          <table className="rb-table">
            <thead>
              <tr>
                <th>카드</th>
                <th>효과</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="rb-act-dot" style={{ background: '#e53935' }} />반응 중지
                </td>
                <td>다음 사람은 카드를 내지 못하고 <b>턴을 건너뜁니다.</b></td>
              </tr>
              <tr>
                <td>
                  <span className="rb-act-dot" style={{ background: '#1e88e5' }} />촉매
                </td>
                <td>게임 진행 방향이 <b>반대로</b> 바뀝니다. (시계 ↔ 반시계)</td>
              </tr>
              <tr>
                <td>
                  <span className="rb-act-dot" style={{ background: '#fb8c00' }} />기구 교체
                </td>
                <td>낸 사람이 다음 사람이 내야 할 <b>색상(족)</b>을 마음대로 지정합니다.</td>
              </tr>
              <tr>
                <td>
                  <span className="rb-act-dot" style={{ background: '#43a047' }} />시약 교체
                </td>
                <td>낸 사람이 다음 사람이 내야 할 <b>도형(주기)</b>을 마음대로 지정합니다.</td>
              </tr>
              <tr>
                <td>
                  <span className="rb-act-dot" style={{ background: '#8e24aa' }} />실험실 사고
                </td>
                <td>다음 사람은 <b>2장 강제로 뽑고</b> 턴을 건너뜁니다.</td>
              </tr>
              <tr>
                <td>
                  <span className="rb-act-dot" style={{ background: '#26a69a' }} />반응 폭주
                </td>
                <td>다음 사람은 <b>4장 강제로 뽑고</b> 턴을 건너뜁니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="rb-final-grid" id="rb-win">
        <div className="rb-final rb-final--elem">
          <div className="rb-final__title">🗣️ "원소!" 외치기</div>
          <p>
            카드를 내고 손에 <b>단 1장</b>이 남는 순간, 즉시 "원소!"를 외쳐야 합니다.
          </p>
          <div className="rb-final__sub">
            ⚠ 외치지 않은 걸 다른 사람이 먼저 지적하면 <b>벌칙으로 2장</b>을 뽑습니다.
          </div>
        </div>
        <div className="rb-final rb-final--win">
          <div className="rb-final__title">🏆 승리 조건 (점수제)</div>
          <p>
            <b>마지막 카드</b>를 내려놓으면 그 즉시 라운드가 종료됩니다.
          </p>
          <div className="rb-score-rules">
            <div className="rb-score-row">
              <span>남은 원소카드 1장당</span>
              <b>+1점</b>
            </div>
            <div className="rb-score-row">
              <span>남은 액션카드 1장당</span>
              <b>+2점</b>
            </div>
            <div className="rb-score-row">
              <span>받은 패널티 점수</span>
              <b>모두 합산</b>
            </div>
          </div>
          <p className="rb-final__foot">
            <b>3라운드</b> 동안 진행 후 점수를 합산하여, <b>가장 낮은 점수</b>를 받은 사람이 최종
            승리합니다!
          </p>
        </div>
      </div>

      <div className="rb-footer">
        <span>Chp4. 물질의 구성 — 주기율표 보드게임</span>
        <span>WoNsO 공식 룰 요약본</span>
      </div>
      <div className="rb-copyright">© 2026 Designed &amp; Developed by 두리쌤. All rights reserved.</div>
    </div>
  )
}
