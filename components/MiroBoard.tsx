
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface StickyNote {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color: string;
}

interface DrawingPath {
  id: string;
  path: string;
  color: string;
  strokeWidth: number;
}

interface TextElement {
  id: string;
  x: number;
  y: number;
  content: string;
  fontSize: number;
  color: string;
  fontFamily: string;
}

interface ImageElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  name: string;
}

export default function MiroBoard() {
  const [tool, setTool] = useState('select');
  const [selectedColor, setSelectedColor] = useState('#EF4444');
  const [brushSize, setBrushSize] = useState(2);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([
    { id: '1', x: 100, y: 80, width: 80, height: 80, content: '', color: '#FEE2E2' },
    { id: '2', x: 250, y: 120, width: 80, height: 80, content: '', color: '#DCFCE7' },
    { id: '3', x: 400, y: 90, width: 80, height: 80, content: '', color: '#DBEAFE' }
  ]);
  const [drawings, setDrawings] = useState<DrawingPath[]>([]);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [imageElements, setImageElements] = useState<ImageElement[]>([]);
  const [draggedNote, setDraggedNote] = useState<string | null>(null);
  const [draggedText, setDraggedText] = useState<string | null>(null);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [resizingNote, setResizingNote] = useState<string | null>(null);
  const [resizingImage, setResizingImage] = useState<string | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string | null>(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMouseOverBoard, setIsMouseOverBoard] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colors = [
    '#EF4444', '#16A34A', '#2563EB', '#F59E0B'
  ];

  const colorToBackground = {
    '#EF4444': '#FEE2E2',
    '#16A34A': '#DCFCE7',
    '#2563EB': '#DBEAFE',
    '#F59E0B': '#FED7AA'
  };

  const fontOptions = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'];

  const BOARD_WIDTH = 1200;
  const BOARD_HEIGHT = 400;

  const getMousePosition = useCallback((e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent) => {
    if (!boardRef.current) return { x: 0, y: 0 };
    const rect = boardRef.current.getBoundingClientRect();

    let clientX, clientY;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    return {
      x: (clientX - rect.left) / scale + scrollX,
      y: (clientY - rect.top) / scale + scrollY
    };
  }, [scrollX, scrollY, scale]);

  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent, itemId: string, itemType: 'note' | 'image', handle: string) => {
    e.stopPropagation();
    const { x, y } = getMousePosition(e);

    if (itemType === 'note') {
      setResizingNote(itemId);
    } else {
      setResizingImage(itemId);
    }
    setResizeHandle(handle);
    setDragStart({ x, y });
  }, [getMousePosition]);

  const handleResizeMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!resizingNote && !resizingImage) return;

    const { x, y } = getMousePosition(e);
    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;

    if (resizingNote) {
      setStickyNotes(prev =>
        prev.map(note => {
          if (note.id !== resizingNote) return note;

          let newWidth = note.width;
          let newHeight = note.height;
          let newX = note.x;
          let newY = note.y;

          switch (resizeHandle) {
            case 'se':
              newWidth = Math.max(60, note.width + deltaX);
              newHeight = Math.max(60, note.height + deltaY);
              break;
            case 'sw':
              newWidth = Math.max(60, note.width - deltaX);
              newHeight = Math.max(60, note.height + deltaY);
              newX = note.x + (note.width - newWidth);
              break;
            case 'ne':
              newWidth = Math.max(60, note.width + deltaX);
              newHeight = Math.max(60, note.height - deltaY);
              newY = note.y + (note.height - newHeight);
              break;
            case 'nw':
              newWidth = Math.max(60, note.width - deltaX);
              newHeight = Math.max(60, note.height - deltaY);
              newX = note.x + (note.width - newWidth);
              newY = note.y + (note.height - newHeight);
              break;
          }

          newX = Math.max(0, Math.min(newX, BOARD_WIDTH - newWidth));
          newY = Math.max(0, Math.min(newY, BOARD_HEIGHT - newHeight));
          newWidth = Math.min(newWidth, BOARD_WIDTH - newX);
          newHeight = Math.min(newHeight, BOARD_HEIGHT - newY);

          return {
            ...note,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
          };
        })
      );
    } else if (resizingImage) {
      setImageElements(prev =>
        prev.map(image => {
          if (image.id !== resizingImage) return image;

          let newWidth = image.width;
          let newHeight = image.height;
          let newX = image.x;
          let newY = image.y;

          switch (resizeHandle) {
            case 'se':
              newWidth = Math.max(50, image.width + deltaX);
              newHeight = Math.max(50, image.height + deltaY);
              break;
            case 'sw':
              newWidth = Math.max(50, image.width - deltaX);
              newHeight = Math.max(50, image.height + deltaY);
              newX = image.x + (image.width - newWidth);
              break;
            case 'ne':
              newWidth = Math.max(50, image.width + deltaX);
              newHeight = Math.max(50, image.height - deltaY);
              newY = image.y + (image.height - newHeight);
              break;
            case 'nw':
              newWidth = Math.max(50, image.width - deltaX);
              newHeight = Math.max(50, image.height - deltaY);
              newX = image.x + (image.width - newWidth);
              newY = image.y + (image.height - newHeight);
              break;
          }

          newX = Math.max(0, Math.min(newX, BOARD_WIDTH - newWidth));
          newY = Math.max(0, Math.min(newY, BOARD_HEIGHT - newHeight));
          newWidth = Math.min(newWidth, BOARD_WIDTH - newX);
          newHeight = Math.min(newHeight, BOARD_HEIGHT - newY);

          return {
            ...image,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
          };
        })
      );
    }

    setDragStart({ x, y });
  }, [resizingNote, resizingImage, resizeHandle, dragStart, getMousePosition, BOARD_WIDTH, BOARD_HEIGHT]);

  const handleResizeEnd = useCallback(() => {
    setResizingNote(null);
    setResizingImage(null);
    setResizeHandle(null);
  }, []);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    if ('touches' in e && e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
      return;
    }

    const { x, y } = getMousePosition(e);

    if (tool === 'select') {
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setDragStart({ x: clientX, y: clientY });
    } else if (tool === 'sticky') {
      const noteSize = isMobile ? 60 : 80;
      const newNote: StickyNote = {
        id: Date.now().toString(),
        x: Math.max(0, Math.min(x - noteSize/2, BOARD_WIDTH - noteSize)),
        y: Math.max(0, Math.min(y - noteSize/2, BOARD_HEIGHT - noteSize)),
        width: noteSize,
        height: noteSize,
        content: 'New Note',
        color: colorToBackground[selectedColor as keyof typeof colorToBackground] || '#FEE2E2'
      };
      setStickyNotes(prev => [...prev, newNote]);
      setEditingNote(newNote.id);
    } else if (tool === 'text') {
      const newText: TextElement = {
        id: Date.now().toString(),
        x: Math.max(0, Math.min(x, BOARD_WIDTH - 200)),
        y: Math.max(0, Math.min(y, BOARD_HEIGHT - 30)),
        content: 'New Text',
        fontSize: fontSize,
        color: selectedColor,
        fontFamily: fontFamily
      };
      setTextElements(prev => [...prev, newText]);
      setEditingText(newText.id);
    } else if (tool === 'pen') {
      setIsDrawing(true);
      setCurrentPath(`M${x},${y}`);
    }
  }, [tool, selectedColor, fontSize, fontFamily, getMousePosition, BOARD_WIDTH, BOARD_HEIGHT, isMobile]);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0) {
        const scaleChange = distance / lastTouchDistance;
        const newScale = Math.min(Math.max(scale * scaleChange, 0.5), 3);
        setScale(newScale);
      }
      setLastTouchDistance(distance);
      return;
    }

    if (resizingNote || resizingImage) {
      handleResizeMove(e);
      return;
    }

    const { x, y } = getMousePosition(e);

    if (draggedNote && tool === 'select') {
      setStickyNotes(prev =>
        prev.map(note =>
          note.id === draggedNote
            ? {
              ...note,
              x: Math.max(0, Math.min(x - dragOffset.x, BOARD_WIDTH - note.width)),
              y: Math.max(0, Math.min(y - dragOffset.y, BOARD_HEIGHT - note.height))
            }
            : note
        )
      );
    } else if (draggedText && tool === 'select') {
      setTextElements(prev =>
        prev.map(text =>
          text.id === draggedText
            ? {
              ...text,
              x: Math.max(0, Math.min(x - dragOffset.x, BOARD_WIDTH - 200)),
              y: Math.max(0, Math.min(y - dragOffset.y, BOARD_HEIGHT - 30))
            }
            : text
        )
      );
    } else if (draggedImage && tool === 'select') {
      setImageElements(prev =>
        prev.map(image =>
          image.id === draggedImage
            ? {
              ...image,
              x: Math.max(0, Math.min(x - dragOffset.x, BOARD_WIDTH - image.width)),
              y: Math.max(0, Math.min(y - dragOffset.y, BOARD_HEIGHT - image.height))
            }
            : image
        )
      );
    } else if (isDrawing && tool === 'pen') {
      setCurrentPath(prev => `${prev} L${x},${y}`);
    } else if (isDragging && tool === 'select' && !draggedNote && !draggedText && !draggedImage) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = (clientX - dragStart.x) / scale;
      const deltaY = (clientY - dragStart.y) / scale;

      const containerWidth = scrollContainerRef.current?.clientWidth || 600;
      const containerHeight = scrollContainerRef.current?.clientHeight || 320;

      const newScrollX = Math.max(0, Math.min(scrollX - deltaX, BOARD_WIDTH - containerWidth / scale));
      const newScrollY = Math.max(0, Math.min(scrollY - deltaY, BOARD_HEIGHT - containerHeight / scale));

      setScrollX(newScrollX);
      setScrollY(newScrollY);
      setDragStart({ x: clientX, y: clientY });
    }
  }, [draggedNote, draggedText, draggedImage, dragOffset, isDrawing, tool, getMousePosition, isDragging, dragStart, scrollX, scrollY, scale, lastTouchDistance, BOARD_WIDTH, BOARD_HEIGHT, resizingNote, resizingImage, handleResizeMove]);

  const handleEnd = useCallback(() => {
    if (draggedNote) {
      setDraggedNote(null);
      setDragOffset({ x: 0, y: 0 });
    } else if (draggedText) {
      setDraggedText(null);
      setDragOffset({ x: 0, y: 0 });
    } else if (draggedImage) {
      setDraggedImage(null);
      setDragOffset({ x: 0, y: 0 });
    } else if (isDrawing && currentPath) {
      const newDrawing: DrawingPath = {
        id: Date.now().toString(),
        path: currentPath,
        color: selectedColor,
        strokeWidth: brushSize
      };
      setDrawings(prev => [...prev, newDrawing]);
      setCurrentPath('');
      setIsDrawing(false);
    }

    if (resizingNote || resizingImage) {
      handleResizeEnd();
    }

    setIsDragging(false);
    setLastTouchDistance(0);
  }, [draggedNote, draggedText, draggedImage, isDrawing, currentPath, selectedColor, brushSize, resizingNote, resizingImage, handleResizeEnd]);

  const handleNoteStart = useCallback((e: React.MouseEvent | React.TouchEvent, noteId: string) => {
    e.stopPropagation();
    if (tool === 'select') {
      const { x, y } = getMousePosition(e);
      const note = stickyNotes.find(n => n.id === noteId);
      if (note) {
        setDraggedNote(noteId);
        setDragOffset({ x: x - note.x, y: y - note.y });
        setEditingNote(null);
      }
    } else if (tool === 'eraser') {
      deleteNote(noteId);
    }
  }, [tool, stickyNotes, getMousePosition]);

  const handleTextStart = useCallback((e: React.MouseEvent | React.TouchEvent, textId: string) => {
    e.stopPropagation();
    if (tool === 'select') {
      const { x, y } = getMousePosition(e);
      const text = textElements.find(t => t.id === textId);
      if (text) {
        setDraggedText(textId);
        setDragOffset({ x: x - text.x, y: y - text.y });
        setEditingText(null);
      }
    } else if (tool === 'eraser') {
      deleteText(textId);
    }
  }, [tool, textElements, getMousePosition]);

  const handleImageStart = useCallback((e: React.MouseEvent | React.TouchEvent, imageId: string) => {
    e.stopPropagation();
    if (tool === 'select') {
      const { x, y } = getMousePosition(e);
      const image = imageElements.find(i => i.id === imageId);
      if (image) {
        setDraggedImage(imageId);
        setDragOffset({ x: x - image.x, y: y - image.y });
      }
    } else if (tool === 'eraser') {
      deleteImage(imageId);
    }
  }, [tool, imageElements, getMousePosition]);

  const handleDrawingClick = useCallback((e: React.MouseEvent | React.TouchEvent, drawingId: string) => {
    e.stopPropagation();
    if (tool === 'eraser') {
      setDrawings(prev => prev.filter(drawing => drawing.id !== drawingId));
    }
  }, [tool]);

  const handleNoteChange = useCallback((noteId: string, content: string) => {
    setStickyNotes(prev =>
      prev.map(note =>
        note.id === noteId ? { ...note, content } : note
      )
    );
  }, []);

  const handleTextChange = useCallback((textId: string, content: string) => {
    setTextElements(prev =>
      prev.map(text =>
        text.id === textId ? { ...text, content } : text
      )
    );
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setStickyNotes(prev => prev.filter(note => note.id !== noteId));
    setEditingNote(null);
  }, []);

  const deleteText = useCallback((textId: string) => {
    setTextElements(prev => prev.filter(text => text.id !== textId));
    setEditingText(null);
  }, []);

  const deleteImage = useCallback((imageId: string) => {
    setImageElements(prev => prev.filter(image => image.id !== imageId));
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 200;
          const maxHeight = 200;
          let { width, height } = img;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          const newImage: ImageElement = {
            id: Date.now().toString(),
            x: Math.max(0, Math.min(100, BOARD_WIDTH - width)),
            y: Math.max(0, Math.min(100, BOARD_HEIGHT - height)),
            width,
            height,
            src: event.target?.result as string,
            name: file.name
          };
          setImageElements(prev => [...prev, newImage]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  }, [BOARD_WIDTH, BOARD_HEIGHT]);

  const clearBoard = useCallback(() => {
    setStickyNotes([]);
    setDrawings([]);
    setTextElements([]);
    setImageElements([]);
    setCurrentPath('');
    setDraggedNote(null);
    setDraggedText(null);
    setDraggedImage(null);
    setIsDrawing(false);
    setEditingNote(null);
    setEditingText(null);
    setScrollX(0);
    setScrollY(0);
    setScale(1);
  }, []);

  const handleScroll = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.ctrlKey || e.metaKey) {
      const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(scale * scaleChange, 0.5), 3);
      setScale(newScale);
    } else {
      const deltaX = e.deltaX || e.deltaY * 0.5;
      const deltaY = e.deltaY;

      const containerWidth = scrollContainerRef.current?.clientWidth || 600;
      const containerHeight = scrollContainerRef.current?.clientHeight || 320;

      const newScrollX = Math.max(0, Math.min(scrollX + deltaX / scale, BOARD_WIDTH - containerWidth / scale));
      const newScrollY = Math.max(0, Math.min(scrollY + deltaY / scale, BOARD_HEIGHT - containerHeight / scale));

      setScrollX(newScrollX);
      setScrollY(newScrollY);
    }
  }, [scrollX, scrollY, scale, BOARD_WIDTH, BOARD_HEIGHT]);

  const handleMouseEnter = useCallback(() => {
    setIsMouseOverBoard(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseOverBoard(false);
    document.body.style.overflow = 'auto';
  }, []);

  const sendEmail = useCallback(async () => {
    setIsEmailSending(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      canvas.width = BOARD_WIDTH;
      canvas.height = BOARD_HEIGHT;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 1;
      for (let x = 0; x <= BOARD_WIDTH; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, BOARD_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y <= BOARD_HEIGHT; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(BOARD_WIDTH, y);
        ctx.stroke();
      }

      for (const image of imageElements) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, image.x, image.y, image.width, image.height);
        };
        img.src = image.src;
      }

      drawings.forEach(drawing => {
        ctx.strokeStyle = drawing.color;
        ctx.lineWidth = drawing.strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const path = new Path2D(drawing.path);
        ctx.stroke(path);
      });

      ctx.font = '12px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      stickyNotes.forEach(note => {
        ctx.fillStyle = note.color;
        ctx.fillRect(note.x, note.y, note.width, note.height);

        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.strokeRect(note.x, note.y, note.width, note.height);

        ctx.fillStyle = '#374151';
        const padding = 8;
        const maxWidth = note.width - padding * 2;
        const words = note.content.split(' ');
        let line = '';
        let y = note.y + padding;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, note.x + padding, y);
            line = words[n] + ' ';
            y += 16;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, note.x + padding, y);
      });

      textElements.forEach(text => {
        ctx.fillStyle = text.color;
        ctx.font = `${text.fontSize}px ${text.fontFamily}`;
        ctx.fillText(text.content, text.x, text.y);
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'design-board.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          const emailSubject = encodeURIComponent('Design Your Idea - Project Planning Board');
          const emailBody = encodeURIComponent(`Hello Nifty Team,\\n\\nI've created a project planning board for my idea. Please find the board image attached (downloaded as 'design-board.png').\\n\\nBoard Details:\\\\n• Total Sticky Notes: ${stickyNotes.length}\\\\n• Text Elements: ${textElements.length}\\\\n• Images: ${imageElements.length}\\\\n• Connection Lines: ${drawings.length}\\\\n• Created: ${new Date().toLocaleString()}\\\\n\\nI'd like to discuss this project with you. Please get back to me at your earliest convenience.\\n\\nBest regards`);
          window.open(`mailto:info@niftyteam.com?subject=${emailSubject}&body=${emailBody}`);
        }
      }, 'image/png');

      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (error) {
      console.error('Error capturing board:', error);
    } finally {
      setIsEmailSending(false);
    }
  }, [stickyNotes, textElements, imageElements, drawings, BOARD_WIDTH, BOARD_HEIGHT]);

  const getCursorClass = () => {
    if (isDragging && tool === 'select' && !draggedNote && !draggedText && !draggedImage) return 'cursor-grabbing';
    switch (tool) {
      case 'pen': return 'cursor-crosshair';
      case 'sticky': return 'cursor-copy';
      case 'text': return 'cursor-text';
      case 'image': return 'cursor-copy';
      case 'eraser': return 'cursor-not-allowed';
      case 'select': return (draggedNote || draggedText || draggedImage) ? 'cursor-grabbing' : 'cursor-grab';
      default: return 'cursor-default';
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const enterFullscreen = async () => {
    if (fullscreenContainerRef.current && !document.fullscreenElement) {
      try {
        await fullscreenContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error('Error entering fullscreen:', error);
      }
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (error) {
        console.error('Error exiting fullscreen:', error);
      }
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      ref={fullscreenContainerRef}
      className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/50 transition-all duration-300">
        <div className="p-3 sm:p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                <button
                  onClick={() => setTool('select')}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    tool === 'select'
                      ? 'bg-red-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-red-600 shadow-sm'
                  }`}
                  title="Select / Pan"
                >
                  <i className="ri-cursor-line text-sm sm:text-base"></i>
                </button>
                <button
                  onClick={() => setTool('pen')}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    tool === 'pen'
                      ? 'bg-red-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-red-600 shadow-sm'
                  }`}
                  title="Draw"
                >
                  <i className="ri-edit-line text-sm sm:text-base"></i>
                </button>
                <button
                  onClick={() => setTool('sticky')}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    tool === 'sticky'
                      ? 'bg-red-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-red-600 shadow-sm'
                  }`}
                  title="Add Note"
                >
                  <i className="ri-sticky-note-line text-sm sm:text-base"></i>
                </button>
                <button
                  onClick={() => setTool('text')}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    tool === 'text'
                      ? 'bg-red-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-red-600 shadow-sm'
                  }`}
                  title="Add Text"
                >
                  <i className="ri-text text-sm sm:text-base"></i>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    tool === 'image'
                      ? 'bg-red-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-red-600 shadow-sm'
                  }`}
                  title="Upload Image"
                >
                  <i className="ri-image-add-line text-sm sm:text-base"></i>
                </button>
                <button
                  onClick={() => setTool('eraser')}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
                    tool === 'eraser'
                      ? 'bg-red-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-red-600 shadow-sm'
                  }`}
                  title="Delete"
                >
                  <i className="ri-eraser-line text-sm sm:text-base"></i>
                </button>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  <i className={`${isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'} text-sm sm:text-base`}></i>
                </button>
                <button
                  onClick={clearBoard}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium whitespace-nowrap shadow-sm hover:shadow-md text-sm"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/50 rounded-xl p-3 backdrop-blur-sm space-y-3 sm:space-y-0">
              {(tool === 'pen' || tool === 'sticky' || tool === 'text') && (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Color</span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-3 transition-all duration-200 hover:scale-110 ${
                          selectedColor === color
                            ? 'border-gray-900 shadow-lg'
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4 sm:space-x-6">
                {tool === 'pen' && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Size</span>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-16 sm:w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-gray-600 w-6 text-center font-medium">{brushSize}</span>
                    </div>
                  </div>
                )}

                {tool === 'text' && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Font</span>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 pr-6 sm:pr-8 bg-white hover:border-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                      <input
                        type="range"
                        min="12"
                        max="36"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-12 sm:w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-gray-600 w-6 text-center font-medium">{fontSize}</span>
                    </div>
                  </div>
                )}

                {tool === 'select' && (
                  <div className="text-xs sm:text-sm text-gray-600 italic">
                    Click and drag to move elements or pan the board
                  </div>
                )}
                {tool === 'eraser' && (
                  <div className="text-xs sm:text-sm text-red-600 italic">
                    Click on elements to delete them
                  </div>
                )}
                {tool === 'sticky' && (
                  <div className="text-xs sm:text-sm text-gray-600 italic">
                    Click anywhere to add a sticky note
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={`relative w-full overflow-hidden touch-none ${isFullscreen ? 'h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)]' : (isMobile ? 'h-80' : 'h-[500px]')}`}
        onWheel={handleScroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={boardRef}
          className={`relative bg-gradient-to-br from-white to-gray-50/50 select-none ${getCursorClass()}`}
          style={{
            width: `${BOARD_WIDTH}px`,
            height: `${BOARD_HEIGHT}px`,
            transform: `translate(-${scrollX}px, -${scrollY}px) scale(${scale})`,
            transformOrigin: '0 0',
            transition: isDragging || resizingNote || resizingImage ? 'none' : 'transform 0.1s ease-out'
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <button
            onClick={sendEmail}
            disabled={isEmailSending}
            className={`fixed top-4 right-4 z-50 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-200 font-medium whitespace-nowrap flex items-center space-x-2 shadow-lg backdrop-blur-sm ${isEmailSending ? 'bg-gray-100/90 text-gray-400 cursor-not-allowed' : 'bg-blue-500/90 text-white hover:bg-blue-600/90 hover:scale-105'}`}
            style={{
              transform: `scale(${1 / scale})`,
              transformOrigin: 'center'
            }}
          >
            <i className={`${isEmailSending ? 'ri-loader-4-line animate-spin' : 'ri-mail-send-line'} text-sm sm:text-base`}></i>
            <span className="text-xs sm:text-sm">
              {isEmailSending ? 'Sending...' : 'Send Email'}
            </span>
          </button>

          {emailSent && (
            <div className="fixed top-20 right-4 z-50 px-4 py-2 bg-green-500/90 text-white rounded-full shadow-lg backdrop-blur-sm flex items-center space-x-2 animate-pulse">
              <i className="ri-check-line text-sm"></i>
              <span className="text-xs sm:text-sm">Email sent!</span>
            </div>
          )}

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ userSelect: 'none' }}
          >
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {drawings.map(drawing => (
              <path
                key={drawing.id}
                d={drawing.path}
                stroke={drawing.color}
                strokeWidth={drawing.strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
                className={tool === 'eraser' ? 'cursor-not-allowed hover:opacity-50' : ''}
                style={{ pointerEvents: tool === 'eraser' ? 'all' : 'none' }}
                onMouseDown={(e) => handleDrawingClick(e, drawing.id)}
                onTouchStart={(e) => handleDrawingClick(e, drawing.id)}
              />
            ))}

            {isDrawing && currentPath && (
              <path
                d={currentPath}
                stroke={selectedColor}
                strokeWidth={brushSize}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            )}
          </svg>

          {imageElements.map(image => (
            <div
              key={image.id}
              className={`absolute group transition-all duration-75 ${tool === 'select' ? 'cursor-move hover:scale-105' : tool === 'eraser' ? 'cursor-not-allowed hover:opacity-50' : 'cursor-default'} ${draggedImage === image.id ? 'scale-105 shadow-xl z-10' : ''}`}
              style={{
                left: `${image.x}px`,
                top: `${image.y}px`,
                width: `${image.width}px`,
                height: `${image.height}px`,
                transform: draggedImage === image.id ? 'scale(1.05)' : 'scale(1)',
                zIndex: draggedImage === image.id ? 10 : 1,
                transition: (resizingImage === image.id || draggedImage === image.id) ? 'none' : 'all 0.075s ease-out'
              }}
              onMouseDown={(e) => handleImageStart(e, image.id)}
              onTouchStart={(e) => handleImageStart(e, image.id)}
            >
              <img
                src={image.src}
                alt={image.name}
                className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-200"
                draggable={false}
              />
              {tool === 'select' && (
                <>
                  <button
                    className={`absolute -top-2 -right-2 ${isMobile ? 'w-6 h-6' : 'w-7 h-7'} bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center hover:bg-red-600 z-20`}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(image.id);
                    }}
                  >
                    <i className="ri-close-line text-white text-xs"></i>
                  </button>

                  <div
                    className={`absolute -top-2 -left-2 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-nw-resize z-10 border-2 border-white shadow-md`}
                    onMouseDown={(e) => handleResizeStart(e, image.id, 'image', 'nw')}
                    onTouchStart={(e) => handleResizeStart(e, image.id, 'image', 'nw')}
                  ></div>
                  <div
                    className={`absolute -top-2 -right-2 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-ne-resize z-10 border-2 border-white shadow-md`}
                    onMouseDown={(e) => handleResizeStart(e, image.id, 'image', 'ne')}
                    onTouchStart={(e) => handleResizeStart(e, image.id, 'image', 'ne')}
                  ></div>
                  <div
                    className={`absolute -bottom-2 -left-2 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-sw-resize z-10 border-2 border-white shadow-md`}
                    onMouseDown={(e) => handleResizeStart(e, image.id, 'image', 'sw')}
                    onTouchStart={(e) => handleResizeStart(e, image.id, 'image', 'sw')}
                  ></div>
                  <div
                    className={`absolute -bottom-2 -right-2 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize z-10 border-2 border-white shadow-md`}
                    onMouseDown={(e) => handleResizeStart(e, image.id, 'image', 'se')}
                    onTouchStart={(e) => handleResizeStart(e, image.id, 'image', 'se')}
                  ></div>
                </>
              )}
            </div>
          ))}

          {stickyNotes.map(note => (
            <div
              key={note.id}
              className={`absolute rounded-lg shadow-lg border border-gray-300 group transition-all duration-75 ${tool === 'select' ? 'cursor-move hover:scale-105' : tool === 'eraser' ? 'cursor-not-allowed hover:bg-red-200' : 'cursor-default'} ${draggedNote === note.id ? 'scale-105 shadow-xl z-10' : ''}`}
              style={{
                left: `${note.x}px`,
                top: `${note.y}px`,
                width: `${note.width}px`,
                height: `${note.height}px`,
                backgroundColor: note.color,
                transform: draggedNote === note.id ? 'scale(1.05)' : 'scale(1)',
                zIndex: draggedNote === note.id ? 10 : editingNote === note.id ? 9 : 1,
                transition: (resizingNote === note.id || draggedNote === note.id) ? 'none' : 'all 0.075s ease-out'
              }}
              onMouseDown={(e) => handleNoteStart(e, note.id)}
              onTouchStart={(e) => handleNoteStart(e, note.id)}
            >
              {editingNote === note.id ? (
                <textarea
                  value={note.content}
                  onChange={(e) => handleNoteChange(note.id, e.target.value)}
                  onBlur={() => setEditingNote(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      setEditingNote(null);
                    }
                    if (e.key === 'Escape') {
                      setEditingNote(null);
                    }
                  }}
                  className={`w-full h-full bg-transparent border-none resize-none p-2 font-medium text-gray-800 focus:outline-none leading-tight ${isMobile ? 'text-xs' : 'text-xs'}`}
                  autoFocus
                  maxLength={50}
                />
              ) : (
                <div
                  className={`w-full h-full p-2 font-medium text-gray-800 leading-tight cursor-pointer overflow-hidden ${isMobile ? 'text-xs' : 'text-xs'}`}
                  onClick={(e) => {
                    if (tool === 'select') {
                      e.stopPropagation();
                      setEditingNote(note.id);
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setEditingNote(note.id);
                  }}
                >
                  {note.content}
                </div>
              )}

              {tool === 'select' && (
                <>
                  <button
                    className={`absolute -top-2 -right-2 ${isMobile ? 'w-6 h-6' : 'w-7 h-7'} bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center hover:bg-red-600 z-20`}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                  >
                    <i className="ri-close-line text-white text-xs"></i>
                  </button>

                  <div
                    className={`absolute -top-2 -left-2 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-nw-resize z-10 border-2 border-white shadow-md`}
                    onMouseDown={(e) => handleResizeStart(e, note.id, 'note', 'nw')}
                    onTouchStart={(e) => handleResizeStart(e, note.id, 'note', 'nw')}
                  ></div>
                  <div
                    className={`absolute -top-2 -right-2 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-ne-resize z-10 border-2 border-white shadow-md`}
                    onMouseDown={(e) => handleResizeStart(e, note.id, 'note', 'ne')}
                    onTouchStart={(e) => handleResizeStart(e, note.id, 'note', 'ne')}
                  ></div>
                  <div
                    className={`absolute -bottom-2 -left-2 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-sw-resize z-10 border-2 border-white shadow-md`}
                    onMouseDown={(e) => handleResizeStart(e, note.id, 'note', 'sw')}
                    onTouchStart={(e) => handleResizeStart(e, note.id, 'note', 'sw')}
                  ></div>
                  <div
                    className={`absolute -bottom-2 -right-2 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize z-10 border-2 border-white shadow-md`}
                    onMouseDown={(e) => handleResizeStart(e, note.id, 'note', 'se')}
                    onTouchStart={(e) => handleResizeStart(e, note.id, 'note', 'se')}
                  ></div>
                </>
              )}
            </div>
          ))}

          {textElements.map(text => (
            <div
              key={text.id}
              className={`absolute group transition-all duration-75 ${tool === 'select' ? 'cursor-move hover:scale-105' : tool === 'eraser' ? 'cursor-not-allowed hover:opacity-50' : 'cursor-default'} ${draggedText === text.id ? 'scale-105 shadow-xl z-10' : ''}`}
              style={{
                left: `${text.x}px`,
                top: `${text.y}px`,
                transform: draggedText === text.id ? 'scale(1.05)' : 'scale(1)',
                zIndex: draggedText === text.id ? 10 : editingText === text.id ? 9 : 1
              }}
              onMouseDown={(e) => handleTextStart(e, text.id)}
              onTouchStart={(e) => handleTextStart(e, text.id)}
            >
              {editingText === text.id ? (
                <input
                  type="text"
                  value={text.content}
                  onChange={(e) => handleTextChange(text.id, e.target.value)}
                  onBlur={() => setEditingText(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setEditingText(null);
                    }
                    if (e.key === 'Escape') {
                      setEditingText(null);
                    }
                  }}
                  className="bg-transparent border-none resize-none font-medium focus:outline-none"
                  style={{
                    fontSize: `${text.fontSize}px`,
                    fontFamily: text.fontFamily,
                    color: text.color,
                    minWidth: '100px'
                  }}
                  autoFocus
                  maxLength={100}
                />
              ) : (
                <div
                  className="font-medium cursor-pointer"
                  style={{
                    fontSize: `${text.fontSize}px`,
                    fontFamily: text.fontFamily,
                    color: text.color
                  }}
                  onClick={(e) => {
                    if (tool === 'select') {
                      e.stopPropagation();
                      setEditingText(text.id);
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setEditingText(text.id);
                  }}
                >
                  {text.content}
                </div>
              )}

              {tool === 'select' && (
                <button
                  className={`absolute -top-1 -right-1 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'} bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center hover:bg-red-600`}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteText(text.id);
                  }}
                >
                  <i className="ri-close-line text-white text-xs"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
