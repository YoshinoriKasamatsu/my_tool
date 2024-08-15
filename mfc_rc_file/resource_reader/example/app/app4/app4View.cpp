
// app4View.cpp : Capp4View クラスの実装
//

#include "pch.h"
#include "framework.h"
// SHARED_HANDLERS は、プレビュー、縮小版、および検索フィルター ハンドラーを実装している ATL プロジェクトで定義でき、
// そのプロジェクトとのドキュメント コードの共有を可能にします。
#ifndef SHARED_HANDLERS
#include "app4.h"
#endif

#include "app4Doc.h"
#include "app4View.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// Capp4View

IMPLEMENT_DYNCREATE(Capp4View, CView)

BEGIN_MESSAGE_MAP(Capp4View, CView)
	// 標準印刷コマンド
	ON_COMMAND(ID_FILE_PRINT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &Capp4View::OnFilePrintPreview)
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
END_MESSAGE_MAP()

// Capp4View コンストラクション/デストラクション

Capp4View::Capp4View() noexcept
{
	// TODO: 構築コードをここに追加します。

}

Capp4View::~Capp4View()
{
}

BOOL Capp4View::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: この位置で CREATESTRUCT cs を修正して Window クラスまたはスタイルを
	//  修正してください。

	return CView::PreCreateWindow(cs);
}

// Capp4View 描画

void Capp4View::OnDraw(CDC* /*pDC*/)
{
	Capp4Doc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: この場所にネイティブ データ用の描画コードを追加します。
}


// Capp4View の印刷


void Capp4View::OnFilePrintPreview()
{
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
}

BOOL Capp4View::OnPreparePrinting(CPrintInfo* pInfo)
{
	// 既定の印刷準備
	return DoPreparePrinting(pInfo);
}

void Capp4View::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: 印刷前の特別な初期化処理を追加してください。
}

void Capp4View::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: 印刷後の後処理を追加してください。
}

void Capp4View::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void Capp4View::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}


// Capp4View の診断

#ifdef _DEBUG
void Capp4View::AssertValid() const
{
	CView::AssertValid();
}

void Capp4View::Dump(CDumpContext& dc) const
{
	CView::Dump(dc);
}

Capp4Doc* Capp4View::GetDocument() const // デバッグ以外のバージョンはインラインです。
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(Capp4Doc)));
	return (Capp4Doc*)m_pDocument;
}
#endif //_DEBUG


// Capp4View メッセージ ハンドラー
