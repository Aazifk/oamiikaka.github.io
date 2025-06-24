import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Clock, CheckCircle, Star, Moon, Sun, Heart } from 'lucide-react';

const IslamicStudyTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyTasks, setDailyTasks] = useState({
    prayers: {
      fajr: false,
      dhuhr: false,
      asr: false,
      maghrib: false,
      isha: false
    },
    quranReading: {
      completed: false,
      pages: 0,
      targetPages: 2
    },
    islamicStudy: {
      completed: false,
      minutes: 0,
      targetMinutes: 30
    },
    dhikr: {
      completed: false,
      count: 0,
      targetCount: 100
    },
    dua: {
      completed: false,
      studied: ''
    }
  });

  const [weeklyGoals, setWeeklyGoals] = useState({
    quranPages: { completed: 0, target: 14 },
    hadithStudy: { completed: 0, target: 5 },
    islamicLectures: { completed: 0, target: 3 },
    charity: { completed: false }
  });

  const [studyTopics] = useState([
    'Aqeedah (Beliefs)',
    'Fiqh (Jurisprudence)',
    'Hadith Studies',
    'Seerah (Prophet\'s Biography)',
    'Tafseer (Quran Commentary)',
    'Islamic History',
    'Arabic Language',
    'Akhlaq (Character Development)'
  ]);

  const [selectedTopic, setSelectedTopic] = useState('');
  const [notes, setNotes] = useState('');

  const prayerTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getHijriDate = () => {
    // Approximate Hijri date calculation
    const gregorianDate = new Date();
    const hijriYear = Math.floor((gregorianDate.getFullYear() - 622) * 1.030684) + 1;
    return `${hijriYear} AH`;
  };

  const togglePrayer = (prayer) => {
    setDailyTasks(prev => ({
      ...prev,
      prayers: {
        ...prev.prayers,
        [prayer]: !prev.prayers[prayer]
      }
    }));
  };

  const updateQuranProgress = (pages) => {
    setDailyTasks(prev => ({
      ...prev,
      quranReading: {
        ...prev.quranReading,
        pages: Math.max(0, pages),
        completed: pages >= prev.quranReading.targetPages
      }
    }));
  };

  const updateStudyTime = (minutes) => {
    setDailyTasks(prev => ({
      ...prev,
      islamicStudy: {
        ...prev.islamicStudy,
        minutes: Math.max(0, minutes),
        completed: minutes >= prev.islamicStudy.targetMinutes
      }
    }));
  };

  const updateDhikrCount = (count) => {
    setDailyTasks(prev => ({
      ...prev,
      dhikr: {
        ...prev.dhikr,
        count: Math.max(0, count),
        completed: count >= prev.dhikr.targetCount
      }
    }));
  };

  const calculateDailyProgress = () => {
    const prayerCount = Object.values(dailyTasks.prayers).filter(Boolean).length;
    const totalTasks = 5 + (dailyTasks.quranReading.completed ? 1 : 0) + 
                      (dailyTasks.islamicStudy.completed ? 1 : 0) + 
                      (dailyTasks.dhikr.completed ? 1 : 0) + 
                      (dailyTasks.dua.completed ? 1 : 0);
    return Math.round((totalTasks / 9) * 100);
  };

  const getDayOfWeek = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[currentDate.getDay()];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <BookOpen className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Islamic Study Tracker</h1>
                <p className="text-gray-600">Strengthen your Deen through consistent practice</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">{formatDate(currentDate)}</p>
              <p className="text-emerald-600 font-medium">{getHijriDate()}</p>
            </div>
          </div>
          
          {/* Daily Progress */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-800 font-medium">Daily Progress</span>
              <span className="text-emerald-700 font-bold">{calculateDailyProgress()}%</span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-3">
              <div 
                className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${calculateDailyProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Prayers */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Daily Prayers</h2>
            </div>
            <div className="space-y-3">
              {prayerTimes.map((prayer) => (
                <div key={prayer} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {prayer === 'Fajr' && <Sun className="w-4 h-4 text-yellow-500" />}
                    {prayer === 'Maghrib' && <Moon className="w-4 h-4 text-indigo-500" />}
                    {!['Fajr', 'Maghrib'].includes(prayer) && <Clock className="w-4 h-4 text-gray-400" />}
                    <span className="text-gray-700">{prayer}</span>
                  </div>
                  <button
                    onClick={() => togglePrayer(prayer.toLowerCase())}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                      ${dailyTasks.prayers[prayer.toLowerCase()] 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-green-400'}`}
                  >
                    {dailyTasks.prayers[prayer.toLowerCase()] && <CheckCircle className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quran Reading */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-800">Quran Reading</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Pages Read Today</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuranProgress(dailyTasks.quranReading.pages - 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{dailyTasks.quranReading.pages}</span>
                  <button
                    onClick={() => updateQuranProgress(dailyTasks.quranReading.pages + 1)}
                    className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Target: {dailyTasks.quranReading.targetPages} pages</span>
                  <span>{Math.round((dailyTasks.quranReading.pages / dailyTasks.quranReading.targetPages) * 100)}%</span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((dailyTasks.quranReading.pages / dailyTasks.quranReading.targetPages) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Islamic Study */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">Islamic Study</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Minutes Studied</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateStudyTime(dailyTasks.islamicStudy.minutes - 5)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{dailyTasks.islamicStudy.minutes}</span>
                  <button
                    onClick={() => updateStudyTime(dailyTasks.islamicStudy.minutes + 5)}
                    className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Target: {dailyTasks.islamicStudy.targetMinutes} minutes</span>
                  <span>{Math.round((dailyTasks.islamicStudy.minutes / dailyTasks.islamicStudy.targetMinutes) * 100)}%</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((dailyTasks.islamicStudy.minutes / dailyTasks.islamicStudy.targetMinutes) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Dhikr Counter */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-rose-600" />
              <h2 className="text-xl font-bold text-gray-800">Dhikr & Tasbih</h2>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-rose-600 mb-2">{dailyTasks.dhikr.count}</div>
                <div className="text-gray-600 text-sm">out of {dailyTasks.dhikr.targetCount}</div>
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => updateDhikrCount(dailyTasks.dhikr.count - 1)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  -1
                </button>
                <button
                  onClick={() => updateDhikrCount(dailyTasks.dhikr.count + 1)}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
                >
                  +1
                </button>
                <button
                  onClick={() => updateDhikrCount(dailyTasks.dhikr.count + 10)}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                >
                  +10
                </button>
              </div>
              <div className="bg-rose-50 rounded-lg p-3">
                <div className="w-full bg-rose-200 rounded-full h-2">
                  <div 
                    className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((dailyTasks.dhikr.count / dailyTasks.dhikr.targetCount) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Topics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Study Topics</h2>
            <div className="space-y-2">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select a topic...</option>
                {studyTopics.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
              {selectedTopic && (
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-800 font-medium">Today's Focus:</p>
                  <p className="text-emerald-700">{selectedTopic}</p>
                </div>
              )}
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Goals</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-800 font-medium">Quran Pages</span>
                  <span className="text-blue-700">{weeklyGoals.quranPages.completed}/{weeklyGoals.quranPages.target}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(weeklyGoals.quranPages.completed / weeklyGoals.quranPages.target) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-indigo-800 font-medium">Hadith Study</span>
                  <span className="text-indigo-700">{weeklyGoals.hadithStudy.completed}/{weeklyGoals.hadithStudy.target}</span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${(weeklyGoals.hadithStudy.completed / weeklyGoals.hadithStudy.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Study Notes & Reflections</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your daily reflections, learned concepts, or questions for further study..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
          />
          <div className="flex justify-end mt-3">
            <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslamicStudyTracker;
