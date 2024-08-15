
// app4.cpp : アプリケーションのクラス動作を定義します。
//

#include "pch.h"
#include "framework.h"
#include "afxwinappex.h"
#include "afxdialogex.h"
#include "app4.h"
#include "MainFrm.h"

#include "app4Doc.h"
#include "app4View.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// Capp4App

BEGIN_MESSAGE_MAP(Capp4App, CWinAppEx)
	ON_COMMAND(ID_APP_ABOUT, &Capp4App::OnAppAbout)
	ON_COMMAND(ID_FILE_NEW_FRAME, &Capp4App::OnFileNewFrame)
	ON_COMMAND(ID_FILE_NEW, &Capp4App::OnFileNew)
	// 標準のファイル基本ドキュメント コマンド
	ON_COMMAND(ID_FILE_OPEN, &CWinAppEx::OnFileOpen)
	// 標準の印刷セットアップ コマンド
	ON_COMMAND(ID_FILE_PRINT_SETUP, &CWinAppEx::OnFilePrintSetup)
END_MESSAGE_MAP()


// Capp4App の構築

Capp4App::Capp4App() noexcept
{
	m_bHiColorIcons = TRUE;


	m_nAppLook = 0;
	// 再起動マネージャーをサポートします
	m_dwRestartManagerSupportFlags = AFX_RESTART_MANAGER_SUPPORT_ALL_ASPECTS;
#ifdef _MANAGED
	// アプリケーションが共通言語ランタイム サポート (/clr) を使用して作成されている場合:
	//     1) この追加設定は、再起動マネージャー サポートが正常に機能するために必要です。
	//     2) 作成するには、プロジェクトに System.Windows.Forms への参照を追加する必要があります。
	System::Windows::Forms::Application::SetUnhandledExceptionMode(System::Windows::Forms::UnhandledExceptionMode::ThrowException);
#endif

	// TODO: 下のアプリケーション ID 文字列を一意の ID 文字列で置換します。推奨される
	// 文字列の形式は CompanyName.ProductName.SubProduct.VersionInformation です
	SetAppID(_T("app4.AppID.NoVersion"));

	// TODO: この位置に構築用コードを追加してください。
	// ここに InitInstance 中の重要な初期化処理をすべて記述してください。
}

// 唯一の Capp4App オブジェクト

Capp4App theApp;


// Capp4App の初期化

BOOL Capp4App::InitInstance()
{
	// アプリケーション マニフェストが visual スタイルを有効にするために、
	// ComCtl32.dll Version 6 以降の使用を指定する場合は、
	// Windows XP に InitCommonControlsEx() が必要です。さもなければ、ウィンドウ作成はすべて失敗します。
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// アプリケーションで使用するすべてのコモン コントロール クラスを含めるには、
	// これを設定します。
	InitCtrls.dwICC = ICC_WIN95_CLASSES;
	InitCommonControlsEx(&InitCtrls);

	CWinAppEx::InitInstance();


	// OLE ライブラリを初期化します。
	if (!AfxOleInit())
	{
		AfxMessageBox(IDP_OLE_INIT_FAILED);
		return FALSE;
	}

	AfxEnableControlContainer();

	EnableTaskbarInteraction(FALSE);

	// RichEdit コントロールを使用するには AfxInitRichEdit2() が必要です
	// AfxInitRichEdit2();

	// 標準初期化
	// これらの機能を使わずに最終的な実行可能ファイルの
	// サイズを縮小したい場合は、以下から不要な初期化
	// ルーチンを削除してください。
	// 設定が格納されているレジストリ キーを変更します。
	// TODO: 会社名または組織名などの適切な文字列に
	// この文字列を変更してください。
	SetRegistryKey(_T("アプリケーション ウィザードで生成されたローカル アプリケーション"));
	LoadStdProfileSettings(4);  // 標準の INI ファイルのオプションをロードします (MRU を含む)


	InitContextMenuManager();

	InitKeyboardManager();

	InitTooltipManager();
	CMFCToolTipInfo ttParams;
	ttParams.m_bVislManagerTheme = TRUE;
	theApp.GetTooltipManager()->SetTooltipParams(AFX_TOOLTIP_TYPE_ALL,
		RUNTIME_CLASS(CMFCToolTipCtrl), &ttParams);

	// アプリケーション用のドキュメント テンプレートを登録します。ドキュメント テンプレート
	//  はドキュメント、フレーム ウィンドウとビューを結合するために機能します。
	CMultiDocTemplate* pDocTemplate;
	pDocTemplate = new CMultiDocTemplate(
		IDR_MAINFRAME,
		RUNTIME_CLASS(Capp4Doc),
		RUNTIME_CLASS(CMainFrame),       // メイン SDI フレーム ウィンドウ
		RUNTIME_CLASS(Capp4View));
	if (!pDocTemplate)
		return FALSE;
	m_pDocTemplate = pDocTemplate;
	AddDocTemplate(pDocTemplate);


	// DDE、file open など標準のシェル コマンドのコマンド ラインを解析します。
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);



	// コマンド ラインで指定されたディスパッチ コマンドです。アプリケーションが
	// /RegServer、/Register、/Unregserver または /Unregister で起動された場合、False を返します。
	if (!ProcessShellCommand(cmdInfo))
		return FALSE;

	// メイン ウィンドウが初期化されたので、表示と更新を行います。
	m_pMainWnd->ShowWindow(SW_SHOW);
	m_pMainWnd->UpdateWindow();
	return TRUE;
}

int Capp4App::ExitInstance()
{
	//TODO: 追加したリソースがある場合にはそれらも処理してください
	AfxOleTerm(FALSE);

	return CWinAppEx::ExitInstance();
}

// Capp4App メッセージ ハンドラー


// アプリケーションのバージョン情報に使われる CAboutDlg ダイアログ

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg() noexcept;

// ダイアログ データ
#ifdef AFX_DESIGN_TIME
	enum { IDD = IDD_ABOUTBOX };
#endif

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV サポート

// 実装
protected:
	DECLARE_MESSAGE_MAP()
};

CAboutDlg::CAboutDlg() noexcept : CDialogEx(IDD_ABOUTBOX)
{
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
END_MESSAGE_MAP()

// ダイアログを実行するためのアプリケーション コマンド
void Capp4App::OnAppAbout()
{
	CAboutDlg aboutDlg;
	aboutDlg.DoModal();
}

// Capp4App のカスタマイズの読み込みと保存方法

void Capp4App::PreLoadState()
{
	BOOL bNameValid;
	CString strName;
	bNameValid = strName.LoadString(IDS_EDIT_MENU);
	ASSERT(bNameValid);
	GetContextMenuManager()->AddMenu(strName, IDR_POPUP_EDIT);
	bNameValid = strName.LoadString(IDS_EXPLORER);
	ASSERT(bNameValid);
	GetContextMenuManager()->AddMenu(strName, IDR_POPUP_EXPLORER);
}

void Capp4App::LoadCustomState()
{
}

void Capp4App::SaveCustomState()
{
}

// Capp4App メッセージ ハンドラー

void Capp4App::OnFileNewFrame()
{
	ASSERT(m_pDocTemplate != nullptr);

	CDocument* pDoc = nullptr;
	CFrameWnd* pFrame = nullptr;

	// m_pDocTemplate によって参照された
	// ドキュメントの新しいインスタンスを作成します。
	if (m_pDocTemplate != nullptr)
		pDoc = m_pDocTemplate->CreateNewDocument();

	if (pDoc != nullptr)
	{
		// 正常に作成された場合、そのドキュメントの新しいフレームを
		// 作成してください。
		pFrame = m_pDocTemplate->CreateNewFrame(pDoc, nullptr);
		if (pFrame != nullptr)
		{
			// タイトルを設定してドキュメントを初期化します。
			// ドキュメントの初期化が失敗した場合、フレーム ウィンドウおよびドキュメントに
			// 後処理を実行します。

			m_pDocTemplate->SetDefaultTitle(pDoc);
			if (!pDoc->OnNewDocument())
			{
				pFrame->DestroyWindow();
				pFrame = nullptr;
			}
			else
			{
				// それ以外の場合はフレームを更新します。
				m_pDocTemplate->InitialUpdateFrame(pFrame, pDoc, TRUE);
			}
		}
	}

	// 失敗した場合、ドキュメントに後処理を実行して、ユーザーに
	// メッセージを表示します。

	if (pFrame == nullptr || pDoc == nullptr)
	{
		delete pDoc;
		AfxMessageBox(AFX_IDP_FAILED_TO_CREATE_DOC);
	}
}

void Capp4App::OnFileNew()
{
	CDocument* pDoc = nullptr;
	CFrameWnd* pFrame;
	pFrame = DYNAMIC_DOWNCAST(CFrameWnd, CWnd::GetActiveWindow());

	if (pFrame != nullptr)
		pDoc = pFrame->GetActiveDocument();

	if (pFrame == nullptr || pDoc == nullptr)
	{
		// 最初のドキュメントの場合は、標準で作成します。
		CWinApp::OnFileNew();
	}
	else
	{
		// それ以外の場合は、変更点を保存するかどうかを確認してから、
		// ドキュメントを最初期化するようにします。
		if (!pDoc->SaveModified())
			return;

		CDocTemplate* pTemplate = pDoc->GetDocTemplate();
		ASSERT(pTemplate != nullptr);

		if (pTemplate != nullptr)
			pTemplate->SetDefaultTitle(pDoc);
		pDoc->OnNewDocument();
	}
}


