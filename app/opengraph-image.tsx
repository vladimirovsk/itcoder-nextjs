import { ImageResponse } from 'next/og';
import { palette } from '@/app/theme/tokens';

export const dynamic = 'force-static';
export const alt = 'IT CODER — Web & Software Development in Calgary';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0b1120 0%, #0f1724 55%, #1a2d5a 100%)',
                    padding: '72px 80px',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Top accent line */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, ${palette.accent[500]} 0%, ${palette.brand[500]} 100%)`,
                    display: 'flex',
                }} />

                {/* Logo text */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
                    <div style={{
                        fontSize: 32,
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        display: 'flex',
                    }}>
                        <span style={{ color: palette.accent[500] }}>IT</span>
                        <span style={{ color: '#ffffff', marginLeft: 6 }}>CODER</span>
                    </div>
                    <div style={{
                        marginLeft: 16,
                        padding: '4px 12px',
                        background: 'rgba(249,115,22,0.15)',
                        borderRadius: 6,
                        fontSize: 14,
                        color: palette.accent[500],
                        fontWeight: 600,
                        display: 'flex',
                    }}>
                        Calgary, Canada
                    </div>
                </div>

                {/* Main headline */}
                <div style={{
                    fontSize: 56,
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    maxWidth: 760,
                    marginBottom: 24,
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                    Your business idea — turned into a working product
                </div>

                {/* Subtitle */}
                <div style={{
                    fontSize: 22,
                    color: 'rgba(255,255,255,0.65)',
                    maxWidth: 640,
                    lineHeight: 1.5,
                    marginBottom: 48,
                    display: 'flex',
                }}>
                    Web apps, REST APIs, mobile apps & automation — from idea to launch.
                </div>

                {/* CTA pill */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                }}>
                    <div style={{
                        background: palette.accent[500],
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 18,
                        padding: '14px 32px',
                        borderRadius: 10,
                        display: 'flex',
                    }}>
                        Build Your Project →
                    </div>
                    <div style={{
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: 16,
                        display: 'flex',
                    }}>
                        itcoder.ca
                    </div>
                </div>

                {/* Right side decorative element */}
                <div style={{
                    position: 'absolute',
                    right: 80,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    background: 'rgba(59,91,219,0.12)',
                    border: '1px solid rgba(59,91,219,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 80,
                }}>
                    {'{ }'}
                </div>
            </div>
        ),
        { ...size },
    );
}
