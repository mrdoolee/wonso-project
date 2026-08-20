import { useEffect } from 'react'
import './CreditsModal.css'

interface CreditsModalProps {
  open: boolean
  onClose: () => void
}

/** 순수 표시용 오버레이. 게임 상태를 참조하지 않는다. */
export default function CreditsModal({ open, onClose }: CreditsModalProps) {
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="credits-overlay" onClick={onClose}>
      <div
        className="credits-modal glass-panel glass-panel--strong"
        role="dialog"
        aria-modal="true"
        aria-label="제작 정보"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="credits-modal__close" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        <div className="credits-card">
          <h3 className="credits-card__title">✨ 제작: 두리쌤</h3>
          <h4 className="credits-card__subtitle">📌 이용 조건</h4>
          <ul className="credits-list">
            <li>교육 목적으로 자유롭게 사용하실 수 있습니다.</li>
            <li>재배포 시 출처(제작자 표기)를 유지해주세요.</li>
            <li>코드를 임의로 수정한 버전을 다시 배포하지 말아주세요.</li>
            <li>수정이 필요하시면 아래 연락처로 요청해주세요.</li>
          </ul>
        </div>

        <div className="credits-card">
          <h4 className="credits-card__subtitle">📷 문의</h4>
          <ul className="credits-list credits-list--links">
            <li>
              Instagram:{' '}
              <a href="https://www.instagram.com/trdoolee" target="_blank" rel="noreferrer">
                trdoolee
              </a>
            </li>
            <li>
              Blog:{' '}
              <a href="https://blog.naver.com/trdoolee" target="_blank" rel="noreferrer">
                blog.naver.com/trdoolee
              </a>
            </li>
          </ul>
          <p className="credits-note">간단한 질문 위주로 답변드리며, 답변이 늦어질 수 있습니다.</p>
        </div>
      </div>
    </div>
  )
}
